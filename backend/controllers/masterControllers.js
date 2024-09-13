const { resSend } = require("../utils/resSend");
const { query } = require("../db/db.js");
const { dateSqlType } = require("../utils/dateFormat");

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
  console.log("Hey i am template_name..", template_name);
  let ngs_count = `SELECT COUNT(template_name) as count FROM template_image_json WHERE template_name = '${template_name}'`;
  const result1 = await query({
    query: ngs_count,
    values: [],
  });

  console.log("hey i am result: ", result1[0].count);

  if (result1 && result1[0].count > 0) {
    try {
      // let sql = `Delete FROM save_data WHERE template_name = '${template_name}' AND is_deleted = 0 `;
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
exports.getall = async (req, res) => {
  try {
    let sql = `SELECT * FROM template_image_json WHERE is_deleted = 0`;

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
  console.log("hey i am template name...", template_name);
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

// POST/api/v1/master/getallomrdata

// selectjson

// exports.selectjson = async (req, res) => {
//   const selectJsonQuery = `
//   SELECT por.result
//   FROM processed_omr_results por
//   JOIN template_image_info tii
//   ON por.template_name = tii.template_name
// `;

//   // Step 2: Execute the query
//   db.query(selectJsonQuery, (err, results) => {
//     if (err) {
//       console.error("Error fetching JSON data:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: "No matching JSON data found" });
//     }

//     // Step 3: Return the selected JSON data
//     res.status(200).json(results);
//   });
// };

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

//  all the batches corresponding to the template_name
exports.alltempbatches = async (req, res) => {
  try {
    // Extract template_name from req.body
    const { template_name } = req.body;

    // SQL query to select batch_name corresponding to template_name from the reviewer_assign table
    let sql = `
      SELECT * 
      FROM reviewer_assign 
      WHERE template_name = ?
    `;

    const result = await query({
      query: sql,
      values: [template_name], // Passing the template_name as a value to the query
    });

    if (result && result.length > 0) {
      // Send response with the result
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
        values: [assign_to ,template_name, batch_name], // Passing the status, template_name, and batch_name to the query
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
      return resSend(res, false, 400, "Template name and batch name are required.", null, null);
    }

    // SQL query to select data
    const selectSql = `
      SELECT * 
      FROM processed_omr_results
      WHERE template_name = ? AND batch_name = ?
    `;

    // Execute the SQL query with parameterized values
    const result = await query({
      query: selectSql,
      values: [template_name, batch_name],
    });

    console.log("Query result:", result);

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
      return resSend(res, false, 404, "No records found for the given template name and batch name.", null, null);
    }
  } catch (error) {
    console.error("Error in proc_omr_result_data:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};





exports.reviewer_reviews_ques_name = async (req, res) => {
  try {
    const { batch_name, question_paper_name } = req.body;

    console.log("batch name... ",batch_name, "...question paper name...", question_paper_name);
  if (!batch_name || !question_paper_name) {
    return res.status(400).json({ error: 'Batch and question_paper_name are required' });
  }

  // SQL query
  // const sqlqu = `
  //   SELECT rr.*
  //   FROM reviewer_reviews rr
  //   JOIN processed_omr_results por
  //   ON rr.template_name = por.template_name
  //      AND rr.batch_name = por.batch_name
  //      AND rr.question_paper_name = por.question_paper_name
  //   WHERE rr.batch_name = ? AND rr.question_paper_name = ?;
  // `;

  // const sqlqu = `
  //   SELECT rr.*
  //   FROM reviewer_reviews rr
  //   JOIN processed_omr_results por
  //   ON rr.template_name = por.template_name
  //   WHERE rr.batch_name = ? AND rr.question_paper_name = ?;
  // `;



  const sqlqu = `
  SELECT *
  FROM reviewer_reviews 
  WHERE batch_name = ? AND question_paper_name = ?;
`;
    // Execute the SQL query with parameterized values
    const result = await query({
      query: sqlqu,
      values: [batch_name , question_paper_name],
    });

    console.log("Query result:", result);

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
      return resSend(res, false, 404, "No records found for the given template name and batch name.", null, null);
    }
  } catch (error) {
    console.log("hello");
    console.error("Error in proc_omr_result_data:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};




exports.reviewer_reviews_data_batchwise = async (req, res) => {
  try {
    const { batch_name} = req.body;

  if (!batch_name ) {
    return res.status(400).json({ error: 'Batch and question_paper_name are required' });
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
      values: [batch_name ],
    });

    console.log("Query result:", result);

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
      return resSend(res, false, 404, "No records found for the given template name and batch name.", null, null);
    }
  } catch (error) {
    console.log("hello");
    console.error("Error in proc_omr_result_data:", error);
    return resSend(res, false, 500, "Internal server error.", error, null);
  }
};











