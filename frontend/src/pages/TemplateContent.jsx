import React, { useState } from "react";
import { FaCommentsDollar, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiDragDropFill } from "react-icons/ri";
import { navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postAPI } from "../utils/fetchapi";
import swal from "sweetalert";
import Papa from 'papaparse';
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
    console.log("hey i am ....template_name, map, t_name",template_name, map, t_name);


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

  const jsonData = [{ "type": "hall_ticket_no_parent", "result": "g", "flag": false, "coord": { "region": [739, 948, 285, 300], "b": [765, 781, 287, 297], "c": [781, 798, 287, 297], "d": [801, 817, 287, 298], "e": [819, 838, 287, 299], "f": [839, 854, 288, 298], "g": [855, 873, 286, 297], "h": [873, 889, 288, 298], "i": [891, 906, 286, 297], "j": [909, 927, 287, 298], "k": [929, 942, 286, 299] } }, { "type": "hall_ticket_no_parent", "result": "g", "flag": false, "coord": { "region": [739, 948, 272, 286], "b": [765, 781, 274, 284], "c": [781, 798, 274, 284], "d": [801, 817, 274, 285], "e": [819, 838, 274, 285], "f": [839, 854, 275, 285], "g": [855, 873, 273, 284], "h": [873, 889, 275, 285], "i": [891, 906, 273, 284], "j": [909, 927, 274, 285], "k": [929, 942, 273, 285] } }, { "type": "hall_ticket_no_parent", "result": "i", "flag": false, "coord": { "region": [739, 948, 285, 300], "b": [765, 781, 287, 297], "c": [781, 798, 287, 297], "d": [801, 817, 287, 298], "e": [819, 838, 287, 299], "f": [839, 854, 288, 298], "g": [855, 873, 286, 297], "h": [873, 889, 288, 298], "i": [891, 906, 286, 297], "j": [909, 927, 287, 298], "k": [929, 942, 286, 299] } }, { "type": "Question", "result": "d", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "Question", "result": "d", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "hall_ticket_no_parent", "result": "k", "flag": false, "coord": { "region": [739, 948, 285, 300], "b": [765, 781, 287, 297], "c": [781, 798, 287, 297], "d": [801, 817, 287, 298], "e": [819, 838, 287, 299], "f": [839, 854, 288, 298], "g": [855, 873, 286, 297], "h": [873, 889, 288, 298], "i": [891, 906, 286, 297], "j": [909, 927, 287, 298], "k": [929, 942, 286, 299] } }, { "type": "Question", "result": "d", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "Question", "result": "c", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "hall_ticket_no_parent", "result": "j", "flag": false, "coord": { "region": [739, 948, 285, 300], "b": [765, 781, 287, 297], "c": [781, 798, 287, 297], "d": [801, 817, 287, 298], "e": [819, 838, 287, 299], "f": [839, 854, 288, 298], "g": [855, 873, 286, 297], "h": [873, 889, 288, 298], "i": [891, 906, 286, 297], "j": [909, 927, 287, 298], "k": [929, 942, 286, 299] } }, { "type": "Question", "result": "b", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "Question", "result": "d", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "hall_ticket_no_parent", "result": "g", "flag": false, "coord": { "region": [739, 948, 285, 300], "b": [765, 781, 287, 297], "c": [781, 798, 287, 297], "d": [801, 817, 287, 298], "e": [819, 838, 287, 299], "f": [839, 854, 288, 298], "g": [855, 873, 286, 297], "h": [873, 889, 288, 298], "i": [891, 906, 286, 297], "j": [909, 927, 287, 298], "k": [929, 942, 286, 299] } }, { "type": "Question", "result": "b", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "hall_ticket_no_parent", "result": "i", "flag": false, "coord": { "region": [739, 948, 285, 300], "b": [765, 781, 287, 297], "c": [781, 798, 287, 297], "d": [801, 817, 287, 298], "e": [819, 838, 287, 299], "f": [839, 854, 288, 298], "g": [855, 873, 286, 297], "h": [873, 889, 288, 298], "i": [891, 906, 286, 297], "j": [909, 927, 287, 298], "k": [929, 942, 286, 299] } }, { "type": "Question", "result": "b", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "Question", "result": "d", "flag": false, "coord": { "region": [518, 538, 433, 578], "a": [522, 536, 464, 486], "b": [522, 536, 494, 515], "c": [522, 535, 524, 545], "d": [522, 536, 554, 572] } }, { "type": "hall_ticket_no_parent", "result": "e", "flag": false, "coord": { "region": [739, 948, 285, 300], "b": [765, 781, 287, 297], "c": [781, 798, 287, 297], "d": [801, 817, 287, 298], "e": [819, 838, 287, 299], "f": [839, 854, 288, 298], "g": [855, 873, 286, 297], "h": [873, 889, 288, 298], "i": [891, 906, 286, 297], "j": [909, 927, 287, 298], "k": [929, 942, 286, 299] } }]
  const handleDownload = () => {

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "t_name": "1723792909312-100418.jpg"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


fetch(`${process.env.REACT_APP_API_URI}/upload/csvresult`, requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    if(!result?.status){
      return toast.error(result?.details);
    }
    // const csv = Papa.unparse(result.details);

    // const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.setAttribute('href', url);
    // link.setAttribute('download', 'data.csv');
    // link.click();
    window.redirect(`${process.env.REACT_APP_FILE_URI}/result.csv`)
  })

  .catch((error) => console.error(error));

  
  };

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
                    onClick={handleDownload}

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
