const fs = require('fs');
const path = require('path');
const { query } = require("../db/db.js");

exports.getKafkaResults = async (req, res) => {
  // Log relevant request details
  console.log(`Received request: ${JSON.stringify(req.body)}`);

  const { key, value } = req.body;

  // Input validation
  if (!key || !value) {
    return res.status(400).json({ message: 'Bad Request: Missing parameters' });
  }

  //spliting key '_' wise
  const splitString = (str) => {
    return str.split('_');
  };

  const parts = splitString(key);

  // Accessing individual parts
  const template_name = parts[0];
  const batch_name = parts[1];
  const question_paper_name = parts[2];

 
  //Result Insertion Started
  try {
    const sql = `SELECT count(ID) as length FROM processed_omr_results WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?`;
    const result = await query({ query: sql, values: [template_name, batch_name, question_paper_name] });

    if (!result || result.length === 0 || result[0].length === 0) {
      return res.status(422).json({ message: 'Invalid Request: No records found' });
    }

    await query({
      query: `UPDATE processed_omr_results SET result = ? WHERE template_name = ? AND batch_name ? AND question_paper_name = ?`,
      values: [value, template_name, batch_name, question_paper_name]
    });

    console.log("Inserted successfully");
    return res.status(200).json({ message: 'Result inserted successfully' });
      
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  //Result Insertion Done

  //Separating Result for RR
  try {
    const { template_name, batch_name, question_paper_name } = req.body;

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
      // Filter JSON objects with "result": "RR" and "flag": true
      const dataObject = parsedResult[0].data;
      const filteredJsonRR = Object.entries(dataObject)
        .filter(([key, item]) => item.result === "RR" && item.flag === true)
        .map(([key, item]) => item);

      // Filter JSON objects except those with "result": "RR"
      const filteredJsonCorrect = Object.entries(dataObject)
        .filter(([key, item]) => item.result !== "RR")
        .map(([key, item]) => item);

      // Insert "RR" data into the reviewer_reviews table
      if (filteredJsonRR.length > 0) {
        const valuesRR = filteredJsonRR.flatMap((item) => [
          JSON.stringify(item), // under_review
          template_name,
          batch_name,
          question_paper_name
        ]);

        console.log("Insert values for reviewer_reviews:", valuesRR);

        const insertRRQuery = `
          INSERT INTO reviewer_reviews (under_review, template_name, batch_name, question_paper_name)
          VALUES ${filteredJsonRR.map(() => "(?, ?, ?, ?)").join(", ")}
        `;

        try {
          const insertRRResult = await query({
            query: insertRRQuery,
            values: valuesRR,
          });

          console.log("Insert result for reviewer_reviews:", insertRRResult);
        } catch (error) {
          console.error("Error inserting into reviewer_reviews:", error);
          return resSend(res, false, 500, "Error storing RR data.", null, error);
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
            values: [correctDataJson, template_name, batch_name, question_paper_name],
          });

          console.log("Update result for correct_result:", updateCorrectResult);

          resSend(
            res,
            true,
            200,
            "Data stored successfully. RR data in reviewer_reviews and correct data in processed_omr_results.",
            { under_review: filteredJsonRR, correct_result: filteredJsonCorrect },
            null
          );
        } catch (error) {
          console.error("Error updating correct_result:", error);
          return resSend(res, false, 500, "Error storing correct data.", null, error);
        }
      } else {
        resSend(res, false, 200, "No matching JSON found for correct data!", parsedResult, null);
      }
    } else {
      resSend(res, false, 200, "No Record Found!", parsedResult, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
  //Separation Done

};
