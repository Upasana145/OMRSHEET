const { query } = require("../db/db.js");
const { getISODate } = require("../utils/dateFormat.js");
const HTML_TEMPLATE = require("../utils/mail-template.js");
const SENDMAIL = require("../utils/mailSend.js");
const { resSend } = require("../utils/resSend");
const path = require("path");
const fs = require("fs");
const { Parser } = require("json2csv");

exports.uploadprocessomrimages = async (req, res) => {
  // Handle Image Upload
  const { batch_name, question_paper_name } = req.body;

  if (!question_paper_name || question_paper_name === "") {
    return resSend(
      res,
      false,
      400, // Changed status code to 400 for client-side errors
      "Question paper name is mandatory.",
      null,
      null
    );
  }
  console.log("hey i am req.file..........", req.file);

  if (!req.file) {
    return resSend(
      res,
      false,
      400, // Changed status code to 400 for client-side errors
      "Please upload a valid image",
      null,
      null
    );
  }

  // Escape backslashes in the file path
  const escapedPath = req.file.path.replace(/\\/g, "\\\\");

  try {
    // Check if the question paper name and batch name already exist
    let checkSql = `SELECT * FROM processed_omr_results WHERE question_paper_name = ? AND batch_name = ?`;
    const existingQuestionPaper = await query({
      query: checkSql,
      values: [question_paper_name, batch_name],
    });

    if (existingQuestionPaper.length > 0) {
      return resSend(
        res,
        false,
        400, // Changed status code to 400 for client-side errors
        "Question paper name and batch name already exist",
        null,
        null
      );
    }

    // Insert new record into the database
    let sql = `INSERT INTO processed_omr_results (question_paper_name, batch_name, ques_paper_img_path) VALUES (?, ?, ?)`;

    const result = await query({
      query: sql,
      values: [question_paper_name, batch_name, escapedPath],
    });

    if (result.affectedRows > 0) {
      return resSend(
        res,
        true,
        200,
        "File uploaded successfully!",
        result,
        null
      );
    } else {
      return resSend(
        res,
        false,
        500, // Changed status code to 500 for server-side errors
        "Failed to upload file",
        result,
        null
      );
    }
  } catch (error) {
    console.error(error);
    return resSend(
      res,
      false,
      500, // Changed status code to 500 for server-side errors
      "Error occurred during file upload",
      error,
      null
    );
  }
};

exports.processcropimage = async (req, res) => {
  // Handle Image Upload
  console.log("hello");

  const { template_name, batch_name, question_paper_name, ID } = req.body;

  console.log(
    "hey i am template_name, batch_name,question_paper_name,id...",
    template_name,
    batch_name,
    question_paper_name,
    ID
  );
  let fileData = {};

  console.log("i am req.fileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", req.file);
  if (req.file) {
    console.log("hey i am request.file", req.file.filename);

    // fileData = {
    //   fileName: req.file.filename,
    //   filePath: req.file.path,
    //   fileType: req.file.mimetype,
    //   fileSize: req.file.size,
    // };

    // Escape backslashes in the file path
    // const escapedPath = req.file.path.replace(/\\/g, "\\\\"); // for sending as path

    try {
      // SQL query to update the cropped_image column in reviewer_reviews
      let sql = `
        UPDATE reviewer_reviews 
        SET cropped_image = '${req.file.filename}' 
        WHERE template_name = '${template_name}' 
        AND batch_name = '${batch_name}' 
        AND question_paper_name = '${question_paper_name}' 
        AND ID = '${ID}'`;
      // Execute the query
      const result = await query({
        query: sql,
        values: [],
      });

      if (result.affectedRows > 0) {
        console.log("Cropped image updated successfully!");
        resSend(
          res,
          true,
          200,
          "Cropped image updated successfully!",
          result,
          null
        );
      } else {
        console.log("No record found to update.");
        resSend(res, false, 200, "No record found!", result, null);
      }
    } catch (error) {
      console.log("Error while updating cropped_image:", error);
      resSend(res, false, 400, "Error updating cropped image", error, null);
    }

    // resSend(res, true, 200, "file uploaded!", fileData, null);
  } else {
    resSend(res, false, 200, "Please upload a valid image", fileData, null);
  }
};

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
    console.log("hello");

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
};

exports.seperate_result = async (req, res) => {
  try {
    const {
      template_name,
      batch_name,
      question_paper_name,
      ques_paper_image_path,
      t_name,
    } = req.body;

    const selectJsonQuery = `
      SELECT result 
      FROM processed_omr_results 
      WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?
    `;

    const result = await query({
      query: selectJsonQuery,
      values: [template_name, batch_name, question_paper_name],
    });

    console.log("Parsed result:", result);

    const parsedResult = result.map((item) => ({
      data: JSON.parse(item.result),
    }));

    if (parsedResult && parsedResult.length > 0) {
      // Access the first result's data object
      const dataObject = parsedResult[0].data;

      // Filter JSON objects with "result": "RR" and "flag": true, including the key
      const filteredJsonRR = Object.entries(dataObject)
        .filter(([key, item]) => item.result === "RR" && item.flag === true)
        .map(([key, item]) => ({ [key]: item }));

      // Filter JSON objects except those with "result": "RR", including the key
      const filteredJsonCorrect = Object.entries(dataObject)
        .filter(([key, item]) => item.result !== "RR")
        .map(([key, item]) => ({ [key]: item }));

      // Insert "RR" data into the reviewer_reviews table
      if (filteredJsonRR.length > 0) {
        const valuesRR = filteredJsonRR.flatMap((item) => [
          JSON.stringify(item), // under_review
          template_name,
          batch_name,
          question_paper_name,
          ques_paper_image_path,
        ]);

        console.log("Insert values for reviewer_reviews:", valuesRR);

        const insertRRQuery = `
          INSERT INTO reviewer_reviews (under_review, template_name, batch_name, question_paper_name,ques_paper_image_path)
          VALUES ${filteredJsonRR.map(() => "(?, ?, ?, ?,?)").join(", ")}
        `;

        try {
          const insertRRResult = await query({
            query: insertRRQuery,
            values: valuesRR,
          });

          console.log("Insert result for reviewer_reviews:", insertRRResult);

          // Insert data into reviewer_assign table after successful insert into reviewer_reviews
          const insertReviewerAssignQuery = `
            INSERT INTO reviewer_assign (template_name, t_name, batch_name)
            VALUES (?, ?, ?)
          `;

          const insertReviewerAssignValues = [
            template_name,
            t_name,
            batch_name,
          ];

          try {
            console.log("hello buddy");
            const insertReviewerAssignResult = await query({
              query: insertReviewerAssignQuery,
              values: insertReviewerAssignValues,
            });

            console.log(
              "Insert result for reviewer_assign:",
              insertReviewerAssignResult
            );
          } catch (error) {
            console.error("Error inserting into reviewer_assign:", error);
            return resSend(
              res,
              false,
              500,
              "Error storing reviewer assignment data.",
              null,
              error
            );
          }
        } catch (error) {
          console.error("Error inserting into reviewer_reviews:", error);
          return resSend(
            res,
            false,
            500,
            "Error storing RR data.",
            null,
            error
          );
        }
      }

      // Update correct results in the processed_omr_results table
      if (filteredJsonCorrect.length > 0) {
        const correctDataJson = JSON.stringify(filteredJsonCorrect);
        const updateCorrectQuery = `
          UPDATE processed_omr_results
          SET correct_result = ?
          WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?
        `;

        try {
          const updateCorrectResult = await query({
            query: updateCorrectQuery,
            values: [
              correctDataJson,
              template_name,
              batch_name,
              question_paper_name,
            ],
          });

          console.log("Update result for correct_result:", updateCorrectResult);

          resSend(
            res,
            true,
            200,
            "Data stored successfully. RR data in reviewer_reviews and correct data in processed_omr_results.",
            {
              under_review: filteredJsonRR,
              correct_result: filteredJsonCorrect,
            },
            null
          );
        } catch (error) {
          console.error("Error updating correct_result:", error);
          return resSend(
            res,
            false,
            500,
            "Error storing correct data.",
            null,
            error
          );
        }
      } else {
        resSend(
          res,
          false,
          200,
          "No matching JSON found for correct data!",
          parsedResult,
          null
        );
      }
    } else {
      resSend(res, false, 200, "No Record Found!", parsedResult, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

exports.updateJsonResult = async (req, res) => {
  try {
    const {
      template_name,
      batch_name,
      question_paper_name,
      id,
      result,
      action,
    } = req.body;

    // Query to select the existing JSON data and status
    const selectJsonQuery = `
      SELECT under_review, status
      FROM reviewer_reviews 
      WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND id = ?
    `;

    const existingData = await query({
      query: selectJsonQuery,
      values: [template_name, batch_name, question_paper_name, id],
    });

    if (existingData.length === 0) {
      return resSend(res, false, 200, "No data found", null, null);
    }

    // Parse the existing JSON data and get the status
    const underReviewData = existingData[0].under_review; // Keep it as string
    const currentStatus = existingData[0].status;

    // Convert the under_review string to an object
    let jsonData;
    try {
      jsonData = JSON.parse(underReviewData);
    } catch (error) {
      console.error("Error parsing under_review JSON:", error);
      return resSend(res, false, 400, "Invalid JSON format", null, null);
    }

    // Check if the underReviewData is nested
    let innerKey = Object.keys(jsonData)[0]; // Get the first key (like 'htn8')
    let innerData = jsonData[innerKey]; // Access the nested object

    // If the status is 1, send a response indicating the record has already been processed
    if (currentStatus === 1) {
      return resSend(
        res,
        true,
        200,
        "Record has already been processed",
        innerData,
        null
      );
    }

    // // Handle the 'skip' action
    // if (action === "skip") {
    //   // Update the status to 1
    //   const updateStatusQuery = `
    //     UPDATE reviewer_reviews
    //     SET status = 1
    //     WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND id = ?
    //   `;

    //   await query({
    //     query: updateStatusQuery,
    //     values: [template_name, batch_name, question_paper_name, id],
    //   });

    //   console.log("Status updated to 1 on skip action.");
    //   return resSend(res, true, 200, "Skip action performed", innerData, null);
    // }
    // Handle the 'skip' action
    if (action === "skip") {
      // Update the result to "skip" and set flag to false
      if (innerData) {
        innerData.result = "skip"; // Set result to "skip"
        innerData.flag = false; // Update the flag to false
      }

      // Convert the updated JSON object back to string for SQL update
      jsonData[innerKey] = innerData; // Update the inner data in the outer structure
      const updatedJsonString = JSON.stringify(jsonData);

      // SQL query to update the modified JSON data and set the status to 1
      const updateJsonQuery = `
        UPDATE reviewer_reviews
        SET under_review = ?, status = 1
        WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND id = ?
      `;

      await query({
        query: updateJsonQuery,
        values: [
          updatedJsonString,
          template_name,
          batch_name,
          question_paper_name,
          id,
        ],
      });

      console.log("JSON data updated successfully with skip action.");
      return resSend(res, true, 200, "Skip action performed", null, null);
    }

    // Handle the 'save' action
    if (action === "save") {
      // Update only the nested JSON with the new result and change flag to false
      if (innerData) {
        innerData.result = result; // Update the result
        innerData.flag = false; // Update the flag to false
      }

      // Convert the updated JSON object back to string for SQL update
      jsonData[innerKey] = innerData; // Update the inner data in the outer structure
      const updatedJsonString = JSON.stringify(jsonData);

      console.log("hey I am updatedJsonString.....", updatedJsonString);

      // SQL query to update the modified JSON data and set the status to 1
      const updateJsonQuery = `
        UPDATE reviewer_reviews
        SET under_review = ?, status = 1
        WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND id = ?
      `;

      await query({
        query: updateJsonQuery,
        values: [
          updatedJsonString,
          template_name,
          batch_name,
          question_paper_name,
          id,
        ],
      });

      console.log("JSON data, flag, and status updated successfully.");
      return resSend(res, true, 200, "Save action performed", null, null);
    }

    // If action is neither 'save' nor 'skip'
    return resSend(res, false, 400, "Invalid action", null, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

exports.getupdateJsonResult = async (req, res) => {
  try {
    let sql = `SELECT under_review,status
      FROM reviewer_reviews `;

    const result = await query({
      query: sql,
      values: [],
    });
    if (result && result.length > 0) {
      // User exits, check passwords
      resSend(res, true, 200, "Reviewer_reviews table data", result, null);
    } else {
      resSend(res, false, 200, "No Record Found!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// exports.submitupdateJsonResult = async (req, res) => {
//   try {
//     const { template_name, batch_name, question_paper_name} = req.body; // Include 'action' to differentiate between save and skip actions

//     // Query to select the existing JSON data
//     const selectJsonQuery = `
//       SELECT under_review
//       FROM reviewer_reviews
//       WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND status = 1
//     `;

//     const existingData = await query({
//       query: selectJsonQuery,
//       values: [template_name, batch_name, question_paper_name],
//     });

//     console.log("existingData...", existingData);
//     if (existingData.length === 0) {
//       return resSend(res, false, 404, "No data found", null, null);
//     }

//     // Query to select the current JSON data from correct_result
//     const selectCorrectResultQuery = `
//       SELECT correct_result
//       FROM processed_omr_results
//       WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?
//     `;

//     const correctResultData = await query({
//       query: selectCorrectResultQuery,
//       values: [template_name, batch_name, question_paper_name],
//     });
// console.log("correctResultData....", correctResultData);

// // if (correctResultData.length === 0) {
// //       return resSend(res, false, 404, "No data found in correct_result", null, null);
// //     }

// //     // Parse the existing JSON from correct_result
// //     let correctResultJson = JSON.parse(correctResultData[0].correct_result);

//  // Initialize correctResultJson based on the presence of data in correct_result
//  let correctResultJson = [];
//  if (correctResultData.length > 0) {
//    correctResultJson = JSON.parse(correctResultData[0].correct_result);
//  }

//   // Parse the JSON objects in under_review and append them to correct_result
//   existingData.forEach((item) => {
//     let underReviewObject = JSON.parse(item.under_review);
//     correctResultJson.push(underReviewObject);
//   });

//   // Convert the updated JSON back to a string
//   const updatedCorrectResult = JSON.stringify(correctResultJson);

//   console.log("hey i am updatedCorrectResult....", updatedCorrectResult);

//  // Update the correct_result column with the merged JSON data
//  const updateQuery = `
//  UPDATE processed_omr_results
//  SET correct_result = ?
//  WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?
// `;

// const updateResult = await query({
//  query: updateQuery,
//  values: [updatedCorrectResult, template_name, batch_name, question_paper_name],
// });

// console.log("Update result:", updateResult);
// resSend(res, true, 200, "Data updated successfully in correct_result.", null, null);
//  // Step 4: Update the status in reviewer_reviews to 2
//  const updateReviewerQuery = `
//  UPDATE reviewer_reviews
//  SET status = 2
//  WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND status = 1
// `;

// const updateReviewerResult = await query({
//  query: updateReviewerQuery,
//  values: [template_name, batch_name, question_paper_name],
// });

// console.log("Reviewer status updated:", updateReviewerResult);

//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

exports.submitupdateJsonResult = async (req, res) => {
  try {
    const { template_name, batch_name, question_paper_name } = req.body;

    // Query to select the existing JSON data

    // Query to check if the flag is already set to 1
    const checkFlagQuery = `
   SELECT flag 
   FROM processed_omr_results
   WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?;
 `;

    const flagData = await query({
      query: checkFlagQuery,
      values: [template_name, batch_name, question_paper_name],
    });

    console.log("hey i am flagData...", flagData);

    //  console.log("hey i am flagData[0].flag....", flagData[0].flag);
    if (flagData[0].flag == 1) {
      // console.log("hello buddy");
      return resSend(
        res,
        true,
        200,
        "Submit process is already done.",
        flagData[0],
        null
      );
    }

    const selectJsonQuery = `
      SELECT under_review
      FROM reviewer_reviews 
      WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND status = 1
    `;

    const existingData = await query({
      query: selectJsonQuery,
      values: [template_name, batch_name, question_paper_name],
    });

    console.log("existingData...", existingData);
    if (existingData.length === 0) {
      return resSend(
        res,
        false,
        200,
        "These data is already submitted",
        null,
        null
      );
    }

    // Query to select the current JSON data from correct_result
    const selectCorrectResultQuery = `
      SELECT correct_result
      FROM processed_omr_results 
      WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? ;
    `;

    const correctResultData = await query({
      query: selectCorrectResultQuery,
      values: [template_name, batch_name, question_paper_name],
    });

    console.log("correctResultData....", correctResultData);

    // Initialize correctResultJson based on the presence of data in correct_result
    let correctResultJson = [];
    if (correctResultData.length > 0) {
      // Check if the correct_result is not empty before parsing
      const correctResultString = correctResultData[0].correct_result;
      if (correctResultString) {
        correctResultJson = JSON.parse(correctResultString);
      }
    }

    // Parse the JSON objects in under_review and append them to correct_result
    existingData.forEach((item) => {
      let underReviewObject = JSON.parse(item.under_review);
      correctResultJson.push(underReviewObject);
    });

    // Convert the updated JSON back to a string
    const updatedCorrectResult = JSON.stringify(correctResultJson);

    console.log("hey i am updatedCorrectResult....", updatedCorrectResult);

    // Update the correct_result column with the merged JSON data
    const updateQuery = `
      UPDATE processed_omr_results 
      SET correct_result = ? , flag = 1
      WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?
    `;

    const updateResult = await query({
      query: updateQuery,
      values: [
        updatedCorrectResult,
        template_name,
        batch_name,
        question_paper_name,
      ],
    });

    console.log("Update result:", updateResult);
    resSend(
      res,
      true,
      200,
      "Data updated successfully in correct_result.",
      null,
      null
    );

    // Update the flag from 0 to 1
    //   const updateFlagQuery = `
    //    UPDATE processed_omr_results
    //    SET flag = 1
    //    WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND flag = 0
    //  `;

    //   const updateFlagResult = await query({
    //     query: updateFlagQuery,
    //     values: [template_name, batch_name, question_paper_name],
    //   });

    //   console.log("Flag update result:", updateFlagResult);

    // Step 4: Update the status in reviewer_reviews to 2
    const updateReviewerQuery = `
      UPDATE reviewer_reviews 
      SET status = 2 
      WHERE template_name = ? AND batch_name = ? AND question_paper_name = ? AND status = 1`;

    const updateReviewerResult = await query({
      query: updateReviewerQuery,
      values: [template_name, batch_name, question_paper_name],
    });

    console.log("Reviewer status updated:", updateReviewerResult);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

exports.csvresult = async (req, res) => {
  try {
    const { t_name } = req.body; // Expecting the template name in the request body

    // Validate the input
    if (!t_name || t_name.trim() === "") {
      return res.status(400).json({ error: "Invalid template_name" });
    }

    // SQL query to select the correct results and batch names
    const selectJsonQuery = `
      SELECT correct_result, batch_name, question_paper_name 
      FROM processed_omr_results 
      WHERE t_name = ? AND flag = 1
    `;

    const result = await query({
      query: selectJsonQuery,
      values: [t_name],
    });

    console.log("Result from database:", result);

    // Check if any results were found
    if (!result || result.length === 0) {
      return res
        .status(200)
        .json({ status: 0, details: "No batches processed or not found." });
    }

    // If we reach this point, it means there are processed results
    return res.status(200).json({
      status: 1,
      details: "Processed results found.",
      results: result,
    });
  } catch (err) {
    console.error("Error converting JSON to CSV:", err);
    res
      .status(500)
      .json({ error: "Error converting JSON to CSV", details: err.message });
  }
};
