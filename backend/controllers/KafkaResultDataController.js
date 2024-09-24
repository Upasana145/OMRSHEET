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
    const sql = `SELECT count(ID) as length FROM processed_omr_results WHERE t_name = ? AND batch_name = ? AND question_paper_name = ?`;
    const result = await query({ query: sql, values: [template_name, batch_name, question_paper_name] });
    console.log('template_name', template_name);
    console.log('batch_name', batch_name);
    console.log('question_paper_name', question_paper_name);
    
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


};
