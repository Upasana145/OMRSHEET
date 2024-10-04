import React, { useState } from "react";
import { FaCommentsDollar, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiDragDropFill } from "react-icons/ri";
import { navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postAPI } from "../utils/fetchapi";
import swal from "sweetalert";
import Papa from "papaparse";
function TemplateContent({ users, fetchUsers, templates }) {
  const sureToDelete = (id) => {
    console.log("i am priniting id.....", id);
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete the department info?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No, cancel it!", "Yes, I am sure!"],
    }).then(async (willDelete) => {
      console.log("helloo buddy..");
      if (willDelete) {
        await deleteHandler(id);
      }
    });
  };
  const deleteHandler = async (id) => {
    console.log("hey in am id...", id);
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

  const handleButtonClick = async (temp) => {
    const { template_name, map, t_name } = temp;
    console.log("this is map:", temp);

    if (!map || !JSON.parse(map) || map === "") {
      return toast.warn("Mapping is required.");
    }

    // Parse the map JSON
    const parsedMap = JSON.parse(map);

    const generateTypeConfig = (items) => {
      const config = {};

      items.forEach((item) => {
        if (item.mode === "parent") {
          const options = {};
          if (item.children && item.children.length > 0) {
            item.children.forEach((child, index) => {
              options[index] = child.name;
            });
            const length = item.children.length;
            options[length] = "RR";
            options[length + 1] = "RR";
            config[item.type] = {
              OPTIONS: options,
              LENGTH: length,
            };
          } else {
            config[item.type] = {
              OPTIONS: { 0: "RR", 1: "RR" },
              LENGTH: 0,
            };
          }
        }
      });

      return config;
    };

    // Generate type_config from the parsed map
    const typeConfig = generateTypeConfig(parsedMap);
    const payload = {
      template: JSON.parse(map),
      template_image: `${process.env.REACT_APP_AI_DATA}${template_name}/default/${t_name}`,
      //data_path: `${process.env.REACT_APP_AI_DATA}${template_name}`,
      data_path: `${process.env.REACT_APP_AI_DATA}${template_name}`,

      // type_config: {
      //   Question: {
      //     OPTIONS: { 0: "a", 1: "b", 2: "c", 3: "d", 4: "RR", 5: "RR" },
      //     LENGTH: 4,
      //   },
      //   hall_ticket_no_parent: {
      //     OPTIONS: {
      //       0: "1",
      //       1: "2",
      //       2: "3",
      //       3: "4",
      //       4: "5",
      //       5: "6",
      //       6: "7",
      //       7: "8",
      //       8: "9",
      //       9: "10",
      //       10: "RR",
      //       11: "RR",
      //     },
      //     LENGTH: 10,
      //   },
      //   test_booklet_parent: {
      //     OPTIONS: {
      //       0: "1",
      //       1: "2",
      //       2: "3",
      //       3: "4",
      //       4: "5",
      //       5: "6",
      //       6: "7",
      //       7: "8",
      //       8: "9",
      //       9: "10",
      //       10: "RR",
      //       11: "RR",
      //     },
      //     LENGTH: 10,
      //   },
      //   Form_no_parent: {
      //     OPTIONS: {
      //       0: "1",
      //       1: "2",
      //       2: "3",
      //       3: "4",
      //       4: "5",
      //       5: "6",
      //       6: "7",
      //       7: "8",
      //       8: "9",
      //       9: "10",
      //       10: "RR",
      //       11: "RR",
      //     },
      //     LENGTH: 10,
      //   },
      // },
      type_config: typeConfig,
    };
    console.log("I am payload", payload);

    try {
      const response = await fetch(process.env.REACT_APP_AI_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      toast.success("Processing has been started!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing.");
    }
  };

  console.log("users....", users);
  const navigate = useNavigate();
  const handleNavigateToMapping = (template) => {
    // <img
    //   //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
    //   //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
    //   src={`${process.env.REACT_APP_FILE_URI}${template.t_name}`}
    //   alt={template.template_name}
    //   // style={{ maxWidth: "100%" }}
    //   style={{ width: "180px" }}
    // />;
    console.log("hey i am template", template);
    navigate("/mapping", { state: { template } });
  };
  //   console.log("Template:", template);
  //   navigate("/mapping", { state: { template } });

  console.log("HEY I AM ", process.env.REACT_APP_FILE_URI);
  console.log("HEY I AM ", process.env.REACT_APP_API_URI);

  const jsonData = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      email: "jane@example.com",
    },
  ];

const convertToCSV = (data, templateName) => {
  console.log("hey i am data..........", data);
  const csvRows = [];
  const headersSet = new Set(); // To keep track of unique headers

  data.forEach((item) => {
    if (item?.correct_result && item.correct_result !== "") {
      const correctResult = JSON.parse(item.correct_result);
      correctResult.forEach((q) => {
        for (const key in q) {
          headersSet.add(key); 
        }
      });
    }
  });

 
  const headers = Array.from(headersSet).sort();
  csvRows.push(["batch_name", "question_paper_name", ...headers].join(",")); // Add headers to the CSV

 
  data.forEach((item) => {
    if (item?.correct_result && item.correct_result !== "") {
      const batchName = item.batch_name;
      const questionPaperName = item.question_paper_name;
      console.log("heyyyyyyyyyy i am item...", item);
      const correctResult = JSON.parse(item.correct_result);

      // Create an object to hold results for the current item
      const results = {};
      correctResult.forEach((q) => {
        for (const key in q) {
          results[key] = q[key].result; // Extract result for each question
        }
      });

      // Create a row with batch name, question paper name, and results
      const row = [batchName, questionPaperName];
      headers.forEach((header) => {
        row.push(results[header] || ""); // Push result or empty string if not exists
      });

      csvRows.push(row.join(",")); // Add the row to csvRows
    }
  });

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
    const { template_name, map, t_name } = temp;
    console.log("This is t_name:", t_name);

    try {
      // Prepare the request payload
      const payload = {
        t_name: t_name, // Pass the t_name to the API
      };

      // Make the API call to the specified endpoint
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/upload/csvresult`,
        {
          method: "POST", // Use POST method
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify(payload), // Convert payload to JSON
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Response from API:", data);

      // Handle the data as needed (e.g., download CSV or notify user)
      if (data.status === 1) {
        // Process the data if available
        // e.g., download the CSV, display results, etc.
        console.log("Processed results:", data.results);
        downloadCSV(data.results, template_name);
      } else {
        // Handle the case where no processed results were found
        console.warn(data.details);
      }
    } catch (error) {
      console.error("Failed to fetch data from the API:", error);
    }
  };

  //   const handleDownload = async (temp) => {
  //     const { template_name, map, t_name } = temp;
  //     console.log("this is map:",temp);

  //   const csv = Papa.unparse(jsonData);

  //   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', 'data.csv');
  //   link.click();
  // };

  return (
    <div>
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
                    // onClick={toggleDrMode}
                    onClick={() => sureToDelete(template.template_name)}
                  >
                    <MdDelete />
                  </button>
                  {/* <button
                    className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1 "
                    title="View"
                    onClick={() => handleButtonClick(template)}
                    // onClick={handleButtonClick(template)}
                    style={{ width: "85px" }}
                  >
                    Export to csv
                  </button> */}
                  <button
                    className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1 "
                    title="View"
                    // onClick={() => handleButtonClick(template)}
                    // onClick={handleButtonClick(template)}
                    // onClick={handleDownload}
                    onClick={() => handleDownload(template)}
                    style={{ width: "85px" }}
                  >
                    Export to csv
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
    </div>
  );
}

export default TemplateContent;
