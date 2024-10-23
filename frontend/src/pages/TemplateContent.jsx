import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postAPI } from "../utils/fetchapi";
import swal from "sweetalert";

function TemplateContent({ users, fetchUsers, templates }) {
  const sureToDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete the department info?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No, cancel it!", "Yes, I am sure!"],
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteHandler(id);
      }
    });
  };
  const deleteHandler = async (id) => {
    let data = await postAPI(
      "master/deleteomrData",
      { template_name: id },

      null
    );
    if (data?.status) {
      toast.success("Department has been deleted successfully.");
      fetchUsers();
    } else {
      toast.error("Department is not deleted! Something went wrong.");
    }
  };

  // const handleButtonClick = async (temp) => {
  //   const { template_name, map, t_name } = temp;

  //   if (!map || !JSON.parse(map) || map === "") {
  //     return toast.warn("Mapping is required.");
  //   }

  //   // Parse the map JSON
  //   const parsedMap = JSON.parse(map);

  //   const generateTypeConfig = (items) => {
  //     const config = {};

  //     items.forEach((item) => {
  //       if (item.mode === "parent") {
  //         const options = {};
  //         if (item.children && item.children.length > 0) {
  //           item.children.forEach((child, index) => {
  //             options[index] = child.name;
  //           });
  //           const length = item.children.length;
  //           options[length] = "RR";
  //           options[length + 1] = "RR";
  //           config[item.type] = {
  //             OPTIONS: options,
  //             LENGTH: length,
  //           };
  //         } else {
  //           config[item.type] = {
  //             OPTIONS: { 0: "RR", 1: "RR" },
  //             LENGTH: 0,
  //           };
  //         }
  //       }
  //     });

  //     return config;
  //   };

  //   // Generate type_config from the parsed map
  //   const typeConfig = generateTypeConfig(parsedMap);
  //   const payload = {
  //     template: JSON.parse(map),
  //     template_image: `${process.env.REACT_APP_AI_DATA}${template_name}/default/${t_name}`,
  //     data_path: `${process.env.REACT_APP_AI_DATA}${template_name}`,
  //     type_config: typeConfig,
  //   };
  //   console.log("I am payload", payload);

  //   try {
  //     const response = await fetch(process.env.REACT_APP_AI_API, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     console.log("Success:", responseData);
  //     toast.success("Processing has been started!");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("An error occurred while processing.");
  //   }
  // };

  const navigate = useNavigate();
  const handleNavigateToMapping = (template) => {
    navigate("/mapping", { state: { template } });
  };

  const convertToCSV = (data, templateName) => {
    const csvRows = [];
    const headersSet = new Set();

    data = data.sort((a, b) => {
      const keyA = Object.keys(a)[0];
      const keyB = Object.keys(b)[0];

      // Handle Roll No first
      if (keyA === "Roll No") return -1;
      if (keyB === "Roll No") return 1;
      return -1;
    });
    console.log("data", data);

    data.forEach((item) => {
      if (item?.correct_result && item.correct_result !== "") {
        let correctResult = JSON.parse(item.correct_result);
        correctResult = correctResult.sort((a, b) => {
          const keyA = Object.keys(a)[0];
          const keyB = Object.keys(b)[0];

          // Handle Questions in numeric order
          const numA = parseInt(keyA.match(/\d+/));
          const numB = parseInt(keyB.match(/\d+/));
          return numA - numB;
        });

        correctResult.forEach((q) => {
          for (const key in q) {
            headersSet.add(key);
          }
        });
      }
    });
    console.log("headersSet", headersSet);

    // const headers = Array.from(headersSet).sort();
    csvRows.push(["Batch", ...headersSet].join(","));

    // data.forEach((item) => {
    //   if (item?.correct_result && item.correct_result !== "") {
    //     const batchName = item.batch_name;
    //     const correctResult = JSON.parse(item.correct_result);

    //     // Create an object to hold results for the current item
    //     const results = {};
    //     correctResult.forEach((q) => {
    //       for (const key in q) {
    //         results[key] = q[key].result;
    //       }
    //     });

    //     // Create a row with batch name, question paper name, and results
    //     const row = [batchName];
    //     headers.forEach((header) => {
    //       row.push(results[header] || "");
    //     });

    //     csvRows.push(row.join(","));
    //   }
    // });

    return csvRows.join("\n"); // Join rows with newline
  };

  const downloadCSV = (data, templateName) => {
    const csvContent = convertToCSV(data, templateName);

    // Create a blob with CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${templateName}.csv`); // Set the CSV file name
    document.body.appendChild(link); // Append link to body
    link.click(); // Simulate click to download
    document.body.removeChild(link); // Clean up
  };

  const handleDownload = async (temp) => {
    const { template_name, t_name } = temp;

    try {
      const payload = {
        t_name: t_name,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/upload/csvresult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      if (data.status) {
        downloadCSV(data.results, template_name);
      } else {
        console.warn(data.details);
      }
    } catch (error) {
      console.error("Failed to fetch data from the API:", error);
    }
  };

  return (
    <>
      <table className="table table-striped table-bordered m-0">
        <thead>
          <tr className="border-0">
            <th className="min-w-150px">Saved Templates</th>
            <th className="min-w-140px">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((template, index) => (
              <tr key={index}>
                <td className="fw-semibold">{template.template_name}</td>

                {/* <img
                  //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
                  //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
                  src={`${process.env.REACT_APP_FILE_URI}${template.t_name}`}
                  alt={template.template_name}
                  // style={{ maxWidth: "100%" }}
                  style={{ width: "180px" }}
                /> */}
                <td>
                  <button
                    className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
                    title="View"
                    onClick={() => handleNavigateToMapping(template)}
                  >
                    <FaSearch />
                  </button>
                  <button
                    className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
                    title="drag"
                    name="drag"
                    onClick={() => sureToDelete(template.template_name)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1 "
                    title="Export"
                    onClick={() => handleDownload(template)}
                    style={{ width: "90px" }}
                  >
                    Export to CSV
                  </button>
                </td>
              </tr>
            ))}

          {/* 
          {templates.map((template, index) => (
            <tr key={index}>
              <td className="fw-semibold">{template.name}</td>
              <td>
                <button
                  className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
                  title="View"
                  onClick={() => handleNavigateToMapping(template)}
                >
                  <FaSearch />
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </>
  );
}

export default TemplateContent;
