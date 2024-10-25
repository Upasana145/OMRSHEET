const { resSend } = require("../utils/resSend");
const { query } = require("../db/db.js");
const { dateSqlType } = require("../utils/dateFormat");
const path = require("path");
const fs = require("fs");
// GET /api/v1/master/dept
exports.getDept = async (req, res) => {
  try {
    let sql = `SELECT * FROM depts`;

    const result = await query({
      query: sql,
      values: [],
    });
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

// POST /api/v1/master/dept
exports.addDept = async (req, res) => {
  const { dept_name, emails, head_name } = req.body;

  if (dept_name && emails && head_name) {
    try {
      let sql = `INSERT INTO depts(dept_name, emails, head_name) VALUES ('${dept_name}','${emails}','${head_name}')`;

      const result = await query({
        query: sql,
        values: [],
      });
      if (result) {
        // User exits, check passwords
        resSend(res, true, 200, "Dept list", result, null);
      } else {
        resSend(res, false, 200, "No Record Found!", result, null);
      }
    } catch (error) {
      console.log(error);
      resSend(res, false, 400, "Error", error, null);
    }
  } else {
    resSend(res, false, 200, "Please fill all the inputs", null, null);
  }
};

// POST /api/v1/master/dept/edit
exports.editDept = async (req, res) => {
  const { dept_id, dept_name, emails, head_name } = req.body;
  try {
    let sql = `UPDATE depts SET dept_name = ?, emails=?, head_name=? WHERE dept_id = ?`;
    const result = await query({
      query: sql,
      values: [dept_name, emails, head_name, dept_id],
    });
    resSend(res, true, 200, "Data Updated", result, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// POST /api/v1/master/dept/delete
exports.deleteDept = async (req, res) => {
  const { dept_id } = req.body;
  try {
    let sql = `DELETE FROM depts WHERE dept_id = ?`;
    const result = await query({
      query: sql,
      values: [dept_id],
    });
    resSend(res, true, 200, "Data Deleted", result, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// GET /api/v1/master/fetchAlerts
exports.fetchAlerts = async (req, res) => {
  let { startTime, endTime } = req.body;
  if (startTime && endTime) {
    try {
      let sql = `SELECT * FROM alarm as t1
      INNER JOIN depts as t2 ON t1.dept_id = t2.dept_id
      WHERE datetime BETWEEN '${startTime}' AND '${endTime}'`;

      const result = await query({
        query: sql,
        values: [],
      });
      if (result && result.length > 0) {
        // User exits, check passwords
        resSend(res, true, 200, "Alarm list", result, null);
      } else {
        resSend(res, false, 200, "No Alarm Record Found!", result, null);
      }
    } catch (error) {
      console.log(error);
      resSend(res, false, 400, "Error", error, null);
    }
  } else {
    resSend(res, false, 200, "Send Start and end time", null, null);
  }
};

// // FOR OMR
// POST /api/v1/master/user/edit
exports.editUser = async (req, res) => {
  const { username, name, email, role } = req.body;
  console.log(username, name, email, role);
  try {
    let sql = `UPDATE auth SET name = ?, email=?, role=? WHERE username = ?`;
    const result = await query({
      query: sql,
      values: [name, email, role, username],
    });
    resSend(res, true, 200, "Data Updated", result, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// POST /api/v1/master/user/delete
exports.deleteUser = async (req, res) => {
  const { auth_id } = req.body;
  console.log("user deleteeeee auth_id", req.body.auth_id);
  try {
    let sql = `DELETE FROM auth WHERE auth_id = ?`;
    const result = await query({
      query: sql,
      values: [auth_id],
    });
    resSend(res, true, 200, "UserData Deleted", result, null);
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

//// POST/api/v1/master/insertomrData
exports.insertomrData = async (req, res) => {
  const { template_name, boxes } = req.body;
  if (template_name && boxes) {
    console.log("Inserting Data");
    try {
      const name_count = `SELECT count(template_name) AS count FROM template_image_json WHERE template_name = ?`;
      const result1 = await query({
        query: name_count,
        values: [template_name],
      });
      console.log("name_count:", result1);

      // If the template_name exists
      if (result1 && result1[0].count > 0) {
        // Convert the map object to a JSON string
        const mapString = JSON.stringify(boxes);

        // Update the existing record
        const sql = `UPDATE template_image_json SET map = ? WHERE template_name = ?`;
        const result = await query({
          query: sql,
          values: [mapString, template_name],
        });

        if (result && result.affectedRows > 0) {
          resSend(res, true, 200, "Data updated successfully", result, null);
        } else {
          resSend(
            res,
            false,
            200,
            "Update failed, no record found",
            result,
            null
          );
        }
      } else {
        resSend(res, false, 200, "No matching template_name found", null, null);
      }
    } catch (error) {
      // Handle error
      console.error("Error updating data:", error);
      resSend(
        res,
        false,
        400,
        "An error occurred while updating data",
        error,
        null
      );
    }
  } else {
    resSend(
      res,
      false,
      400,
      "Please provide both template_name and map",
      null,
      null
    );
  }
};
// POST/api/v1/master/deleteomrData
exports.deleteomrData = async (req, res) => {
  const { template_name } = req.body;
  let ngs_count = `SELECT COUNT(template_name) as count FROM template_image_json WHERE template_name = '${template_name}'`;
  const result1 = await query({
    query: ngs_count,
    values: [],
  });

  if (result1 && result1[0].count > 0) {
    try {
      // let sql = `Delete FROM  WHERE template_name = '${template_name}' AND is_deleted = 0 `;
      let sql = `UPDATE template_image_json SET is_deleted = 1 WHERE template_name = '${template_name}' AND is_deleted = 0`;
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
// POST/api/v1/master/editomrData
exports.editomrData = async (req, res) => {
  const { template_name, map } = req.body;
  try {
    let name_count = `SELECT COUNT(template_name) as count FROM  WHERE template_name  = '${template_name}'`;
    const result2 = await query({
      query: name_count,
      values: [],
    });

    if (result2 && result2[0].count > 0) {
      const mapString = JSON.stringify(map);
      const currentDate = new Date().toISOString().slice(0, 10);
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
exports.getall = async (req, res) => {
  try {
    let sql = `SELECT * FROM template_image_json WHERE is_deleted = 0 ORDER BY ID DESC`;

    const result = await query({
      query: sql,
      values: [],
    });
    if (result && result.length > 0) {
      resSend(res, true, 200, "OMR list", result, null);
    } else {
      resSend(res, false, 200, "No Record Found!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

exports.getspecifictemp = async (req, res) => {
  const { template_name } = req.body; // Assuming the template_name is provided as a query parameter
  if (!template_name) {
    return resSend(res, false, 400, "Template name is required", null, null);
  }

  try {
    // Query to get the specific template by template_name
    const sql = `SELECT * FROM template_image_json WHERE template_name = ?`;
    const result = await query({
      query: sql,
      values: [template_name],
    });

    if (result && result.length > 0) {
      resSend(res, true, 200, "OMR list", result, null);
    } else {
      resSend(res, false, 404, "No Record Found!", result, null); // Changed status code to 404 for not found
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 500, "Error", error, null); // Changed status code to 500 for server error
  }
};

exports.getalltempbatch = async (req, res) => {
  try {
    let sql = `SELECT * FROM reviewer_assign`;
    const result = await query({
      query: sql,
      values: [],
    });
    if (result && result.length > 0) {
      // User exits, check passwords
      resSend(res, true, 200, "all data", result, null);
    } else {
      resSend(res, false, 200, "No Record Found!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

exports.alltempbatches = async (req, res) => {
  try {
    const { template_name } = req.body;
    let sql = `
      SELECT * 
      FROM reviewer_assign 
      WHERE template_name = ?
    `;

    const result = await query({
      query: sql,
      values: [template_name],
    });

    if (result && result.length > 0) {
      resSend(res, true, 200, "All batch names found", result, null);
    } else {
      resSend(res, false, 200, "No Record Found!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// updatestatusbatches

exports.updatestatusbatches = async (req, res) => {
  try {
    // Extract template_name, batch_name, and status from req.body
    const { template_name, batch_name, status } = req.body;

    // SQL query to select batch_name corresponding to template_name from the reviewer_assign table
    let selectSql = `
      SELECT * 
      FROM reviewer_assign 
      WHERE template_name = ? && batch_name = ?
    `;

    const result = await query({
      query: selectSql,
      values: [template_name, batch_name], // Passing the template_name and batch_name as values to the query
    });

    if (result && result.length > 0) {
      // If the record is found, update the status
      let updateSql = `
        UPDATE reviewer_assign 
        SET status = ? 
        WHERE template_name = ? && batch_name = ?
      `;

      await query({
        query: updateSql,
        values: [status, template_name, batch_name], // Passing the status, template_name, and batch_name to the query
      });

      // Send response with the updated status
      return resSend(res, true, 200, "Status updated successfully", null, null);
    } else {
      // Send response when no record is found
      return resSend(res, false, 200, "No Record Found!", null, null);
    }
  } catch (error) {
    console.log(error);
    return resSend(res, false, 400, "Error", error, null);
  }
};

exports.updatestatussubmit = async (req, res) => {
  try {
    // Extract template_name and batch_name from req.body
    const { template_name, batch_name } = req.body;

    // SQL query to select flags corresponding to template_name and batch_name
    let selectSql = `
      SELECT flag 
      FROM processed_omr_results
      WHERE template_name = ? AND batch_name = ?
    `;

    const result = await query({
      query: selectSql,
      values: [template_name, batch_name], // Passing the template_name and batch_name as values to the query
    });

    if (result && result.length > 0) {
      // Check if all flags are "1"
      const allFlagsAreOne = result.every((row) => row.flag === "1");

      if (allFlagsAreOne) {
        // Run update query if all flags are "1"
        let updateSql = `
          UPDATE reviewer_assign 
          SET status = "Complete"
          WHERE template_name = ? AND batch_name = ?
        `;

        await query({
          query: updateSql,
          values: [template_name, batch_name], // Passing template_name and batch_name to the query
        });

        return resSend(
          res,
          true,
          200,
          "Status updated successfully",
          result,
          null
        );
      } else {
        // If not all flags are "1", return response without updating
        return resSend(
          res,
          true,
          200,
          "Not all flags are '1', status not updated",
          result,
          null
        );
      }
    } else {
      // Send response when no record is found
      return resSend(res, false, 200, "No Record Found!", null, null);
    }
  } catch (error) {
    console.log(error);
    return resSend(res, false, 400, "Error", error, null);
  }
};

//reviewer assign

exports.reviewerassign = async (req, res) => {
  try {
    // Extract template_name, batch_name, and status from req.body
    const { template_name, batch_name, assign_to } = req.body;

    // SQL query to select batch_name corresponding to template_name from the reviewer_assign table
    let selectSql = `
      SELECT * 
      FROM reviewer_assign 
      WHERE template_name = ? && batch_name = ?
    `;

    const result = await query({
      query: selectSql,
      values: [template_name, batch_name], // Passing the template_name and batch_name as values to the query
    });

    if (result && result.length > 0) {
      // If the record is found, update the status
      let updateSql = `
        UPDATE reviewer_assign 
        SET assign_to = ? 
        WHERE template_name = ? && batch_name = ?
      `;

      await query({
        query: updateSql,
        values: [assign_to, template_name, batch_name], // Passing the status, template_name, and batch_name to the query
      });

      // Send response with the updated status
      return resSend(res, true, 200, " assign_to successfully", null, null);
    } else {
      // Send response when no record is found
      return resSend(res, false, 200, "No Record Found!", null, null);
    }
  } catch (error) {
    console.log(error);
    return resSend(res, false, 400, "Error", error, null);
  }
};

//
// proc_omr_result_data

// http://localhost:4002/api/v1/master/proc_data
exports.proc_omr_result_data = async (req, res) => {
  try {
    const { template_name, batch_name } = req.body;

    // Validate input
    if (!template_name || !batch_name) {
      return resSend(
        res,
        false,
        400,
        "Template name and batch name are required.",
        null,
        null
      );
    }

    const selectSql = `
      SELECT * 
      FROM processed_omr_results
      WHERE template_name = ? AND batch_name = ?
    `;

    const result = await query({
      query: selectSql,
      values: [template_name, batch_name],
    });

    const checkCropSQL = `
      SELECT count(ID) as count
      FROM reviewer_reviews
      WHERE template_name = ? AND batch_name = ? AND crop_flag = 0
    `;

    for (const item of result) {
      const [{ count }] = await query({
        query: checkCropSQL,
        values: [item.template_name, item.batch_name],
      });

      console.log("item", item);
      if (count > 0) {
        item.crop_flag = "0";
      } else {
        item.crop_flag = "1";
      }
    }

    if (result && result.length > 0) {
      return resSend(
        res,
        true,
        200,
        "Processed OMR results corresponding to the given template name and batch name.",
        result,
        null
      );
    } else {
      return resSend(
        res,
        false,
        404,
        "No records found for the given template name and batch name.",
        null,
        null
      );
    }
  } catch (error) {
    console.error("Error in proc_omr_result_data:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};

// revquesname
exports.reviewer_reviews_ques_name = async (req, res) => {
  try {
    const { batch_name, question_paper_name } = req.body;
    if (!batch_name || !question_paper_name) {
      return res
        .status(400)
        .json({ error: "Batch and question_paper_name are required" });
    }

    const sqlqu = `
  SELECT *
  FROM reviewer_reviews 
  WHERE batch_name = ? AND question_paper_name = ?;
`;
    // Execute the SQL query with parameterized values
    const result = await query({
      query: sqlqu,
      values: [batch_name, question_paper_name],
    });

    // Check if the result contains multiple rows
    if (result && result.length > 0) {
      return resSend(
        res,
        true,
        200,
        "Processed OMR results corresponding to the given template name and batch name.",
        result,
        null
      );
    } else {
      return resSend(
        res,
        false,
        404,
        "No records found for the given template name and batch name.",
        null,
        null
      );
    }
  } catch (error) {
    console.log("hello");
    console.error("Error in proc_omr_result_data:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};

exports.reviewer_reviews_data_batchwise = async (req, res) => {
  try {
    const { batch_name } = req.body;

    if (!batch_name) {
      return res
        .status(400)
        .json({ error: "Batch and question_paper_name are required" });
    }

    const sqlqu = `
    SELECT rr.*
    FROM reviewer_reviews rr
    JOIN processed_omr_results por
    ON rr.template_name = por.template_name
       AND rr.batch_name = por.batch_name
    WHERE rr.batch_name = ? ;
  `;
    // Execute the SQL query with parameterized values
    const result = await query({
      query: sqlqu,
      values: [batch_name],
    });

    // Check if the result contains multiple rows
    if (result && result.length > 0) {
      return resSend(
        res,
        true,
        200,
        "Processed OMR results corresponding to the given template name and batch name.",
        result, // Return all matching rows
        null
      );
    } else {
      // Send response when no record is found
      return resSend(
        res,
        false,
        404,
        "No records found for the given template name and batch name.",
        null,
        null
      );
    }
  } catch (error) {
    console.log("hello");
    console.error("Error in proc_omr_result_data:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};

exports.processFoldersAndImages = async (req, res) => {
  try {
    const { template_name } = req.body; // Get template_name from the request body

    if (!template_name) {
      return resSend(
        res,
        false,
        400,
        "Template name (template_name) is required.",
        null,
        null
      );
    }

    // Query to select t_name and id from template_json table
    const templateQuery = `SELECT t_name, ID FROM template_image_json WHERE template_name = ?`;

    // Execute the query to get t_name and id
    const templateResult = await query({
      query: templateQuery,
      values: [template_name],
    });

    if (!templateResult || templateResult.length === 0) {
      return resSend(
        res,
        false,
        404,
        `No records found for template_name: '${template_name}' in the template_json table.`,
        null,
        null
      );
    }

    // Extract t_name and id from the query result
    const { t_name, ID } = templateResult[0];
    console.log(`Template found: t_name=${t_name}, id=${ID}`);

    // Define the base path
    const desktopPath = process.env.PROJECT_FOLDER_PATH;

    // Log all the folders in the Desktop directory
    const allFoldersOnDesktop = fs.readdirSync(desktopPath).filter((item) => {
      return fs.lstatSync(path.join(desktopPath, item)).isDirectory();
    });

    console.log(
      `All folders present in ${desktopPath}: ${allFoldersOnDesktop}`
    );

    // Construct the base directory path using template_name
    const baseDir = path.join(desktopPath, template_name);

    // Check if the folder for template_name exists
    if (!fs.existsSync(baseDir)) {
      return resSend(
        res,
        false,
        404,
        `Folder '${template_name}' not found in the base directory.`,
        null,
        null
      );
    }

    // Read all folders in the base directory (inside the folder corresponding to template_name)
    const folders = fs.readdirSync(baseDir);

    if (!folders || folders.length === 0) {
      return resSend(
        res,
        false,
        200,
        "The batch folders are missing.",
        null,
        null
      );
    }

    console.log("Folders inside the base directory:", folders);

    // Array to store all image paths for bulk insertion
    let allImagePaths = [];

    // Iterate over each folder
    for (let folder of folders) {
      console.log("Processing folder name:", folder);
      if (folder === "default") {
        console.log("Skipping folder 'default'");
        continue; // Skip to the next folder
      }
      const folderPath = path.join(baseDir, folder);

      // Check if the current item is a directory
      if (fs.lstatSync(folderPath).isDirectory()) {
        console.log(`Processing folder: ${folderPath}`);

        // Read all images in the current folder
        const files = fs.readdirSync(folderPath);

        if (!files || files.length === 0) {
          // If no files are found, stop further processing and send a Toastify message
          console.log(`No files found in folder: ${folderPath}`);
          return resSend(
            res,
            false,
            200,
            `No files found in the folder: ${folder}`,
            null,
            null
          );
        } else {
          // Iterate over each image in the folder
          for (let file of files) {
            console.log("Processing image name:", file);
            const filePath = path.join(folderPath, file);

            // Check if the file is an image
            if (fs.lstatSync(filePath).isFile()) {
              console.log(`Found image: ${filePath}`);

              // Store the folder path and image path for database insertion
              allImagePaths.push([
                template_name,
                ID,
                t_name,
                folder,
                file,
                file,
              ]);
            }
          }
        }
      }
    }

    // Insert all image paths into the database
    if (allImagePaths.length > 0) {
      // Create placeholders for the query
      const placeholders = allImagePaths.map(() => "(?, ?,?,?,?,?)").join(", ");
      // const sqlQuery = `INSERT INTO images_path (folder_path, image_path) VALUES ${placeholders}`;
      const sqlQuery = `INSERT INTO processed_omr_results (template_name,template_id,t_name,batch_name, question_paper_name,ques_paper_image_path) VALUES ${placeholders}`;

      // Flatten the array to pass as values
      const flattenedValues = allImagePaths.flat();

      // Execute the SQL query
      const result = await query({
        query: sqlQuery,
        values: flattenedValues,
      });

      console.log("Inserted image paths into the database:", result);
      return resSend(
        res,
        true,
        200,
        "Image processing completed successfully.",
        result,
        null
      );
    } else {
      return resSend(
        res,
        false,
        404,
        "No images found in the folders.",
        null,
        null
      );
    }
  } catch (error) {
    console.error("Error processing images:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};

exports.getimgprocessFoldersAndImages = async (req, res) => {
  try {
    const { template_name, batch_name } = req.body; // Get template_name from the request body

    if (!template_name) {
      return resSend(
        res,
        false,
        400,
        "Template name (template_name) is required.",
        null,
        null
      );
    }

    // Query to select t_name and id from template_json table
    const templateQuery = `SELECT t_name, ID FROM template_image_json WHERE template_name = ?`;

    // Execute the query to get t_name and id
    const templateResult = await query({
      query: templateQuery,
      values: [template_name],
    });

    if (!templateResult || templateResult.length === 0) {
      return resSend(
        res,
        false,
        404,
        `No records found for template_name: '${template_name}' in the template_json table.`,
        null,
        null
      );
    }

    // Extract t_name and id from the query result
    const { t_name, ID } = templateResult[0];
    console.log(`Template found: t_name=${t_name}, id=${ID}`);

    // Define the base path
    const desktopPath = process.env.PROJECT_FOLDER_PATH;

    // Log all the folders in the Desktop directory
    const allFoldersOnDesktop = fs.readdirSync(desktopPath).filter((item) => {
      return fs.lstatSync(path.join(desktopPath, item)).isDirectory();
    });

    console.log(
      `All folders present in ${desktopPath}: ${allFoldersOnDesktop}`
    );

    // Construct the base directory path using template_name
    const baseDir = path.join(desktopPath, template_name);
    const batch_baseDir = path.join(baseDir, batch_name);

    // Check if the folder for template_name exists
    if (!fs.existsSync(baseDir)) {
      return resSend(
        res,
        false,
        404,
        `Folder '${template_name}' not found in the base directory.`,
        null,
        null
      );
    }

    // Read all folders in the base directory (inside the folder corresponding to template_name)
    const folders = fs.readdirSync(baseDir);

    if (!folders || folders.length === 0) {
      return resSend(
        res,
        false,
        200,
        "The batch folders are missing.",
        null,
        null
      );
    }

    console.log("Folders inside the base directory:", folders);

    // Array to store all image paths for bulk insertion
    let allImagePaths = [];

    // Iterate over each folder
    for (let folder of folders) {
      console.log("Processing folder name:", folder);
      if (folder === "default") {
        console.log("Skipping folder 'default'");
        continue; // Skip to the next folder
      }
      const folderPath = path.join(baseDir, batch_name);

      // Check if the current item is a directory
      if (fs.lstatSync(folderPath).isDirectory()) {
        console.log(`Processing folder: ${folderPath}`);

        // Read all images in the current folder
        const files = fs.readdirSync(folderPath);

        if (!files || files.length === 0) {
          // If no files are found, stop further processing and send a Toastify message
          console.log(`No files found in folder: ${folderPath}`);
          return resSend(
            res,
            false,
            200,
            `No files found in the folder: ${folder}`,
            null,
            null
          );
        } else {
          // Iterate over each image in the folder
          for (let file of files) {
            console.log("Processing image name:", file);
            const filePath = path.join(folderPath, file);

            // Check if the file is an image
            if (fs.lstatSync(filePath).isFile()) {
              console.log(`Found image: ${filePath}`);

              // Store the folder path and image path for database insertion
              allImagePaths.push([
                template_name,
                ID,
                t_name,
                folder,
                file,
                file,
              ]);
            }
          }
        }
      }
    }
    return;
  } catch (error) {
    console.error("Error processing images:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};
