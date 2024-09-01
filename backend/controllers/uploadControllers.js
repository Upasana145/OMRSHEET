const { query } = require("../db/db.js");
const { getISODate } = require("../utils/dateFormat.js");
const HTML_TEMPLATE = require("../utils/mail-template.js");
const SENDMAIL = require("../utils/mailSend.js");
const { resSend } = require("../utils/resSend");
const path = require("path");
const fs = require("fs");

exports.uploadFile = async (req, res) => {
  // Handle Image Upload
  const { template_name, text } = req.body;

  if (!template_name || template_name === "") {
    return resSend(
      res,
      false,
      200,
      "Template name is mandatory. ",
      fileData,
      null
    );
  }

  let fileData = {};

  if (!req.file) {
    return resSend(
      res,
      false,
      200,
      "Please upload a valid image",
      fileData,
      null
    );
  }

  // Escape backslashes in the file path
  const escapedPath = req.file.path.replace(/\\/g, "\\\\");
  try {
    // Check if the template name already exists
    let checkSql = `SELECT * FROM template_image_info WHERE template_name = ?`;
    const existingTemplate = await query({
      query: checkSql,
      values: [template_name],
    });
    if (existingTemplate.length > 0) {
      return res
        .status(400)
        .json({ status: 0, message: "Template name already exists" });
    }

    const folderPath = path.join(
      process.env.PROJECT_FOLDER_PATH,
      template_name,
      "default"
    );

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Move the file from temp to the correct folder
    const tempPath = req.file.path;
    let imgName = req.file.filename;
    const targetPath = path.join(folderPath, imgName);

    try {
      fs.copyFileSync(tempPath, targetPath);
      // fs.unlinkSync(tempPath); // Delete the temp file

      console.log(`File uploaded to: ${targetPath}`);
    } catch (err) {
      console.error("Err:", err);
      return res.status(500).send("Error during file operation.");
    }

    let sql = `INSERT INTO template_image_info(template_name,t_name,template_image_path) VALUES ('${template_name}', '${imgName}','${escapedPath}')`;

    const result = await query({
      query: sql,
      values: [],
    });

    let sql2 = `INSERT INTO template_image_json(template_name, t_name,template_image_path) VALUES ('${template_name}', '${imgName}','${escapedPath}')`;

    const result2 = await query({
      query: sql2,
      values: [],
    });

    if (result && result2) {
      resSend(res, true, 200, "File uploaded!", result, null);
    } else {
      resSend(res, false, 200, "No Record Found!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// exports.uploadFile = async (req, res) => {
//   // Handle Image Upload
//   let fileData = {};
//   // console.log("hey i am req.body...", req.file.filename);
//   // console.log("hey i am req.fileee..", req.file.path);
//   // console.log("hey i am req.text.......", req.text);

//   if (req.file) {
//     console.log("hey i am text data:", req.text.text);
//     // fileData = {
//     //   fileName: req.file.filename,
//     //   filePath: req.file.path,
//     //   fileType: req.file.mimetype,
//     //   fileSize: req.file.size,
//     // };
//     console.log("hey i am request.file", req.file.path);
//     // Escape backslashes in the file path
//     const escapedPath = req.file.path.replace(/\\/g, "\\\\");
//     try {
//       let sql = `INSERT INTO template_image_info(template_name,template_image_path) VALUES ('${req.file.filename}', '${escapedPath}')`;

//       const result = await query({
//         query: sql,
//         values: [],
//       });

//       let sql2 = `INSERT INTO template_image_json(template_name,template_image_path) VALUES ('${req.file.filename}', '${escapedPath}')`;

//       const result2 = await query({
//         query: sql2,
//         values: [],
//       });

//       if (result) {
//         resSend(res, true, 200, "file uploaded!", result, null);
//       } else {
//         resSend(res, false, 200, "No Record Found!", result, null);
//       }
//     } catch (error) {
//       console.log(error);
//       resSend(res, false, 400, "Error", error, null);
//     }

//     // resSend(res, true, 200, "file uploaded!", fileData, null);
//   } else {
//     resSend(res, false, 200, "Please upload a valid image", fileData, null);
//   }
// };

// POST/api/v1/master/insertomrData
exports.insertomrData = async (req, res) => {
  const { template_name, map } = req.body;
  console.log("hey i am template_name..", template_name, " ", map);

  if ((template_name, map)) {
    try {
      let name_count = `select count(template_name) as count from save_data where template_name = '${template_name}'`;
      const result1 = await query({
        query: name_count,
        values: [],
      });
      console.log("name_count:", result1);

      console.log("name_count:", result1[0].count);

      if (result1 && result1[0].count < 1) {
        // Convert the map object to a JSON string
        const mapString = JSON.stringify(map);
        let sql = `INSERT INTO save_data( template_name,
        map) VALUES ('${template_name}','${mapString}')`;

        const result = await query({
          query: sql,
          values: [],
        });

        if (result) {
          resSend(res, true, 200, "Dept list", result, null);
        } else {
          resSend(res, false, 200, "No Record Found!", result, null);
        }
      } else {
        resSend(
          res,
          false,
          200,
          "Template name is already exists.",
          null,
          null
        );
      }
    } catch (error) {
      // Handle error
      console.log(error);
      resSend(res, false, 400, "Error", error, null);
    }
  } else {
    resSend(res, false, 200, "Please fill all the inputs", null, null);
  }
};

// POST/api/v1/master/editomrData
exports.editomrData = async (req, res) => {
  const { template_name, map } = req.body;
  console.log("hey i am template " + template_name);
  try {
    let name_count = `SELECT COUNT(template_name) as count FROM save_data WHERE template_name  = '${template_name}'`;
    const result2 = await query({
      query: name_count,
      values: [],
    });

    console.log("hey i am result2", result2, name_count);
    console.log("hey i am result2", result2[0].count);

    if (result2 && result2[0].count > 0) {
      const mapString = JSON.stringify(map);
      const currentDate = new Date().toISOString().slice(0, 10);
      // console.log("hey i am currentdateeeeee...", currentDate);

      // Get current date
      // const specialInfo = []; // Array to store special information

      // if (Birthday) {
      //   specialInfo.push({ birthday: Birthday, date: currentDate });
      // }
      // if ( Anniversary) {
      //   specialInfo.push({ anniversory: Anniversory, date: currentDate });
      // }
      // const specialInfoJSON = JSON.stringify(specialInfo); // Convert to JSON string

      // let sql = `UPDATE employee SET name=?, why_special=?, employee_email=?, senior_email=?, hr_email=? WHERE NGS=?`;

      let sql = `UPDATE save_data SET map=? WHERE template_name=?`;

      const result = await query({
        query: sql,
        values: [mapString, template_name],
      });

      resSend(res, true, 200, "OMR Data Updated", result, null);
    } else {
      resSend(
        res,
        true,
        200,
        "you cann't edit because Template Name doesn't exists",
        null,
        null
      );
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// POST/api/v1/master/deleteomrData
exports.deleteomrData = async (req, res) => {
  const { template_name } = req.body;
  console.log("Hey i am template_name..", template_name);
  let ngs_count = `SELECT COUNT(template_name) as count FROM save_data WHERE template_name = '${template_name}'`;
  const result1 = await query({
    query: ngs_count,
    values: [],
  });

  // console.log("hey i am result: ", result1[0].count);

  if (result1 && result1[0].count > 0) {
    try {
      // let sql = `Delete FROM save_data WHERE template_name = '${template_name}' AND is_deleted = 0 `;
      let sql = `UPDATE save_data SET is_deleted = 1 WHERE template_name = '${template_name}' AND is_deleted = 0`;
      const result = await query({
        query: sql,
        values: [],
      });
      resSend(res, true, 200, "OMR Data deleted successfully.", result, null);
    } catch (error) {
      resSend(res, false, 400, "Error", error, null);
    }
  } else {
    resSend(res, false, 200, "Template name don't exist.", null, null);
  }
};

// phle wala code date 17.7.2024 se phle wala code
// exports.uploadFile = (req, res) => {
//   // Handle Image Upload
//   let fileData = {};
//   if (req.file) {
//     fileData = {
//       fileName: req.file.filename,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,
//       fileSize: req.file.size,
//     };
//     resSend(res, true, 200, "file uploaded!", fileData, null);
//   } else {
//     resSend(res, false, 200, "Please upload a valid image", fileData, null);
//   }
// };

exports.saveImgToDB = async (req, res) => {
  const { dept_name, camera, image, alarm_type } = req.body;
  // console.log("hey i am req.body", req.body);
  // let image = req.file;
  const currentDate = new Date();
  // Set the time zone offset for IST, which is UTC+5:30
  const istOffset = 330; // 5 hours and 30 minutes
  currentDate.setMinutes(currentDate.getMinutes() + istOffset);
  const datetime = currentDate.toISOString();

  try {
    let sql = `SELECT * FROM depts WHERE dept_name= '${dept_name}'`;

    const result = await query({
      query: sql,
      values: [],
    });
    // console.log("hey i am depts details", result);
    let sql3 = `SELECT * FROM mail_log`;

    const result3 = await query({
      query: sql3,
      values: [],
    });
    // console.log("hey i am sql3 details", result3);

    let sql2 = `SELECT emails FROM depts WHERE dept_name= '${dept_name}'`;

    const result2 = await query({
      query: sql2,
      values: [],
    });
    // console.log("hey i am depts details", result2[0].emails);

    if (result && result.length > 0) {
      let dept_id = result[0]?.dept_id;
      let sql = `INSERT INTO alarm (dept_id, camera, alarm_type, image, datetime) VALUES ('${dept_id}', '${camera}', '${alarm_type}', '${image}', '${datetime}')`;
      let sql2 = `INSERT INTO mail_log (body, is_sent, datetime, emails) VALUES ('${JSON.stringify(
        req.body
      )}', 0, '${datetime}', '${JSON.stringify(result2[0].emails)}' )`;
      const re = await query({
        query: sql,
        values: [],
      });
      const re2 = await query({
        query: sql2,
        values: [],
      });

      resSend(res, true, 200, "Data saved!", re, null);

      // mail send
      // let time = datetime.split("T")[1].slice(0, 5);

      // let date = new Date(datetime).toLocaleDateString("en", {
      //   weekday: "long",
      //   year: "numeric",
      //   month: "long",
      //   day: "numeric",
      // });

      // let mailDetails = {
      //   from: "safety.sudisafoundry@gmail.com",
      //   to: result[0]?.emails,
      //   subject: "The staff is not wearing the safety helmet",
      //   html: HTML_TEMPLATE(req.body, date, time),
      //   attachments: [
      //     {
      //       filename: image,
      //       path: `uploads/${image}`,
      //     },
      //   ],
      // };
      // SENDMAIL(mailDetails, function (err, data) {
      //   if (!err) {
      //     console.log("Error Occurs", err);
      //   } else {
      //     console.log("Email sent successfully");
      //   }
      // });
    } else {
      resSend(
        res,
        false,
        200,
        "Dept doesn't exist! No Record Found!",
        result,
        null
      );
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// mrinmoy code
// const { query } = require("../db/db.js");
// const { getISODate } = require("../utils/dateFormat.js");
// const HTML_TEMPLATE = require("../utils/mail-template.js");
// const SENDMAIL = require("../utils/mailSend.js");
// const { resSend } = require("../utils/resSend");

// exports.uploadFile = (req, res) => {
//   // Handle Image Upload
//   let fileData = {};
//   if (req.file) {
//     fileData = {
//       fileName: req.file.filename,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,
//       fileSize: req.file.size,
//     };
//     resSend(res, true, 200, "file uploaded!", fileData, null);
//   } else {
//     resSend(res, false, 200, "Please upload a valid image", fileData, null);
//   }
// };

// exports.saveImgToDB = async (req, res) => {
//   const { dept_name, camera, image, alarm_type } = req.body;
//   console.log("hey i am req.body", req.body);
//   // let image = req.file;
//   const currentDate = new Date();
//   // Set the time zone offset for IST, which is UTC+5:30
//   const istOffset = 330; // 5 hours and 30 minutes
//   currentDate.setMinutes(currentDate.getMinutes() + istOffset);
//   const datetime = currentDate.toISOString();

//   try {
//     let sql = `SELECT * FROM depts WHERE dept_name= '${dept_name}'`;

//     const result = await query({
//       query: sql,
//       values: [],
//     });

//     if (result && result.length > 0) {
//       let dept_id = result[0]?.dept_id;
//       let sql = `INSERT INTO alarm (dept_id, camera, alarm_type, image, datetime) VALUES ('${dept_id}', '${camera}', '${alarm_type}', '${image}', '${datetime}')`;
//       let sql2 = `INSERT INTO mail_log (body, is_sent, datetime) VALUES ('${JSON.stringify(
//         req.body
//       )}', 0, '${datetime}')`;
//       const re = await query({
//         query: sql,
//         values: [],
//       });
//       const re2 = await query({
//         query: sql2,
//         values: [],
//       });

//       resSend(res, true, 200, "Data saved!", re, null);

//       // mail send
//       let time = datetime.split("T")[1].slice(0, 5);

//       let date = new Date(datetime).toLocaleDateString("en", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });

//       // let mailDetails = {
//       //   from: "safety.sudisafoundry@gmail.com",
//       //   to: result[0]?.emails,
//       //   subject: "The staff is not wearing the safety helmet",
//       //   html: HTML_TEMPLATE(req.body, date, time),
//       //   attachments: [
//       //     {
//       //       filename: image,
//       //       path: `uploads/${image}`,
//       //     },
//       //   ],
//       // };
//       // SENDMAIL(mailDetails, function (err, data) {
//       //   if (!err) {
//       //     console.log("Error Occurs", err);
//       //   } else {
//       //     console.log("Email sent successfully");
//       //   }
//       // });
//     } else {
//       resSend(
//         res,
//         false,
//         200,
//         "Dept doesn't exist! No Record Found!",
//         result,
//         null
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

//For reviewer page
exports.allomrimages = async (req, res) => {
  try {
    let sql = `SELECT * 
    FROM template_image_json 
    WHERE template_name IN (SELECT template_name FROM processed_omr_results);
    `;

    const result = await query({
      query: sql,
      values: [],
    });
    console.log(result);
    if (result && result.length > 0) {
      // User exits, check passwords
      resSend(res, true, 200, "Dept list", result, null);
    } else {
      resSend(res, false, 200, "No Record Found!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }

  // Handle Image Upload
  // const {} = req.body;
  // try {
  //   const { ngs } = req.body;
  //   console.log("Heyy i am NGS...", ngs);
  //   const { file } = req;
  //   console.log("Heyy i am file...", file);
  //   let sql = `SELECT * FROM employee where NGS = '${ngs}'`;
  //   const result2 = await query({
  //     query: sql,
  //     values: [],
  //   });
  //   if (result2 && result2.length > 0) {
  //     // If employee with given NGS exists
  //     await mailControllerindividual(result2[0]); // Pass the employee details to mailController function
  //     res.send("MailController function called!");
  //   } else {
  //     res.send("No employee found with provided NGS.");
  //   }
  // } catch (error) {
  //   console.log(error);
  //   resSend(res, false, 400, "Error", error, null);
  // }
};

// ye kaam ka h.....29082024

// exports.selectjson = async (req, res) => {
//   try {
//     const selectJsonQuery = `
//       SELECT por.result
//       FROM processed_omr_results por
//       JOIN template_image_info tii
//       ON por.template_name = tii.template_name
//   `;

//     const result = await query({
//       query: selectJsonQuery,
//       values: [],
//     });
//     console.log(result);
//     if (result && result.length > 0) {
//       // User exits, check passwords
//       resSend(res, true, 200, "Dept list", result, null);
//     } else {
//       resSend(res, false, 200, "No Record Found!", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

//hello

// exports.selectjson = async (req, res) => {
//   try {
//     // Select JSON data from the processed_omr_results table
//     const selectJsonQuery = `
//       SELECT por.result
//       FROM processed_omr_results por
//       JOIN template_image_info tii
//       ON por.template_name = tii.template_name
//     `;

//     const result = await query({
//       query: selectJsonQuery,
//       values: [],
//     });

//     // console.log("hey i am result", result);
//     const parsedResult = result.map((item) => JSON.parse(item.result));
//     console.log("hey i am parsed result:-.", parsedResult[0]);
//     if (parsedResult && parsedResult.length > 0) {
//       // Filter JSON objects with "parsedResult": "RR" and "flag": true
//       const dataObject = parsedResult[0];
//       // const filteredJson = parsedResult.filter((item) => {
//       //   console.log("i am item", item);
//       //   return item.result === "RR" && item.flag === true;
//       // });
//       const filteredJson = Object.entries(dataObject)
//         .filter(([key, item]) => item.result === "RR" && item.flag === true)
//         .map(([key, item]) => item);

//       console.log("hey i am filtered json data...", filteredJson);
//       if (filteredJson.length > 0) {
//         // Insert the filtered JSON into the reviewer_reviews table
//         console.log("Filtered data:", filteredJson);

//         // Prepare the values to be inserted
//         const values = filteredJson.map((item) => [JSON.stringify(item)]);

//         // Construct the INSERT query with the correct syntax
//         const insertQuery = `
//             INSERT INTO reviewer_reviews (under_review)
//             VALUES ${values.map(() => "(?)").join(", ")}
//         `;

//         try {
//           // Execute the insert query
//           const insertResult = await query({
//             query: insertQuery,
//             values: values.flat(), // Flatten the array to match the placeholders
//           });

//           console.log("Insert result:", insertResult);

//           // Now, fetch the data from the table to log it
//           const selectQuery = `
//                 SELECT * FROM reviewer_reviews
//             `;

//           // Execute the select query to fetch the data
//           const selectResult = await query({
//             query: selectQuery,
//           });

//           console.log("Current data in reviewer_reviews table:", selectResult);

//           resSend(
//             res,
//             true,
//             200,
//             "Data stored in reviewer_reviews successfully.",
//             filteredJson,
//             null
//           );
//         } catch (error) {
//           // Handle errors during query execution
//           console.error("Error inserting or fetching data:", error);
//           resSend(
//             res,
//             false,
//             500,
//             "Error storing or fetching data.",
//             null,
//             error
//           );
//         }
//       } else {
//         resSend(res, false, 200, "No matching JSON found!", parsedResult, null);
//       }
//     } else {
//       resSend(res, false, 200, "No Record Found!", parsedResult, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };
exports.selectjson = async (req, res) => {
  try {
    // Select JSON data from the processed_omr_results table
    const selectJsonQuery = `
      SELECT por.template_name, por.result
      FROM processed_omr_results por
      JOIN template_image_info tii
      ON por.template_name = tii.template_name
    `;

    const result = await query({
      query: selectJsonQuery,
      values: [],
    });

    // Parse the results
    const parsedResult = result.map((item) => ({
      template_name: item.template_name,
      data: JSON.parse(item.result),
    }));

    console.log("Parsed result:", parsedResult);

    if (parsedResult && parsedResult.length > 0) {
      // Filter JSON objects with "result": "RR" and "flag": true
      const dataObject = parsedResult[0].data;
      const filteredJson = Object.entries(dataObject)
        .filter(([key, item]) => item.result === "RR" && item.flag === true)
        .map(([key, item]) => item);

      console.log("Filtered JSON data:", filteredJson);

      if (filteredJson.length > 0) {
        // Prepare the values to be inserted
        const values = filteredJson.flatMap((item) => [
          JSON.stringify(item), // under_review
          parsedResult[0].template_name, // template_name
        ]);

        // Construct the INSERT query with the correct syntax
        const insertQuery = `
            INSERT INTO reviewer_reviews (under_review, template_name)
            VALUES ${filteredJson.map(() => "(?, ?)").join(", ")}
        `;

        try {
          // Execute the insert query
          const insertResult = await query({
            query: insertQuery,
            values: values,
          });

          console.log("Insert result:", insertResult);

          // Now, fetch the data from the table to log it
          const selectQuery = `
                SELECT * FROM reviewer_reviews
            `;

          // Execute the select query to fetch the data
          const selectResult = await query({
            query: selectQuery,
          });

          console.log("Current data in reviewer_reviews table:", selectResult);

          resSend(
            res,
            true,
            200,
            "Data stored in reviewer_reviews successfully.",
            filteredJson,
            null
          );
        } catch (error) {
          // Handle errors during query execution
          console.error("Error inserting or fetching data:", error);
          resSend(
            res,
            false,
            500,
            "Error storing or fetching data.",
            null,
            error
          );
        }
      } else {
        resSend(res, false, 200, "No matching JSON found!", parsedResult, null);
      }
    } else {
      resSend(res, false, 200, "No Record Found!", parsedResult, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};
