const fs = require("fs");
const path = require("path");
const { query } = require("../db/db.js");

exports.getKafkaResults = async (req, res) => {
  // Log relevant request details
  const { key, value } = req.body;

  // Input validation
  if (!key || !value) {
    return res.status(400).json({ message: "Bad Request: Missing parameters" });
  }

  //spliting key '_' wise
  const splitString = (str) => {
    return str.split("_");
  };

  const parts = splitString(key);
  console.log("parts", parts);

  // Accessing individual parts
  const t_name = parts[0];
  const batch_name = parts[1];
  const question_paper_name = parts[2];

  //Result Insertion Started
  try {
    const childSql = `SELECT template_name FROM processed_omr_results WHERE t_name = ? AND batch_name = ? `;
    const childResult = await query({
      query: childSql,
      values: [t_name, batch_name],
    });
    console.log("template_name", childResult[0].template_name);

    if (
      !childResult ||
      childResult.length === 0 ||
      childResult[0].length === 0
    ) {
      return res
        .status(422)
        .json({ message: "Invalid Request: No Template found" });
    }

    const template_name = childResult[0].template_name;

    // const question_paper_name = path.join(
    //   process.env.PROJECT_FOLDER_PATH,
    //   template_name,
    //   batch_name,
    //   parts[2]
    // );

    const sql = `SELECT count(ID) as length FROM processed_omr_results WHERE t_name = ? AND batch_name = ? AND question_paper_name = ?`;
    const result = await query({
      query: sql,
      values: [t_name, batch_name, question_paper_name],
    });
    console.log("t_name", t_name);
    console.log("batch_name", batch_name);
    console.log("question_paper_name", question_paper_name);

    if (!result || result.length === 0 || result[0].length === 0) {
      return res
        .status(422)
        .json({ message: "Invalid Request: No records found" });
    }
    console.log("value", value);

    await query({
      query: `UPDATE processed_omr_results SET result = ? WHERE t_name = ? AND batch_name = ? AND question_paper_name = ?`,
      values: [value, t_name, batch_name, question_paper_name],
    });

    //Separate Result process starts here
    const selectJsonQuery = `
      SELECT result 
      FROM processed_omr_results 
      WHERE t_name = ? AND batch_name = ? AND question_paper_name = ?
    `;

    const resu = await query({
      query: selectJsonQuery,
      values: [t_name, batch_name, question_paper_name],
    });

    const parsedResult = resu.map((item) => {
      return {
        data: item.result,
      };
    });

    console.log("parsedResult", parsedResult && parsedResult.length > 0);
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
          question_paper_name,
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
            INSERT INTO reviewer_assign (template_name, t_name, batch_name, status)
            VALUES (?, ?, ?, ?)
          `;

          const insertReviewerAssignValues = [
            template_name,
            t_name,
            batch_name,
            "Pending",
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
    //Separate Results process ends here

    // console.log("Inserted successfully");
    // return res.status(200).json({ message: "Result inserted successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  //Result Insertion Done
};
