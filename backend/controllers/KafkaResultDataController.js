const fs = require('fs');
const path = require('path');
const { query } = require("../db/db.js");


exports.uploadOMR = async (req, res) => {
  try {
    const sql = `SELECT count(ID) as length FROM processed_omr_results WHERE ID = ?`;
    const result = await query({ query: sql, values: [processed_omr_result_id] }); 

    if (result[0].total === 0) {
      return res.status(422).json({ message: 'Invalid Request' });
    }

    await query({
      query: `UPDATE processed_omr_results SET result = ? WEHERE ID = ?`,
      values: [template_name, processed_omr_result_id]
    }); 

    fileEntries.push({
      processed_omr_result_id,
      batch_name,
      file_path: relativeFilePath,
    });
    res.status(200).json({ message: 'OMR sheets uploaded successfully', files: fileEntries });
      
  }    
  catch (error) { 
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getOMRResults = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try { 
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10); 
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ success: false, message: 'Invalid page number' });
    }
    if (isNaN(pageSize) || pageSize < 1) {
      return res.status(400).json({ success: false, message: 'Invalid limit value' });
    } 
    const offset = (pageNumber - 1) * pageSize;  

    const dataSql = `
        SELECT 
          o.ID,
          o.processed_omr_result_id, 
          o.batch_name, 
          o.ques_paper_image_path, 
          o.created_at, 
          o.updated_at, 
          o.template_name,
          o.t_name,
          o.result,
          j.map
        FROM processed_omr_results o
        JOIN template_image_json j ON o.processed_omr_result_id = j.ID
        LIMIT ${pageSize} OFFSET ${offset}
      `;


    const dataResult = await query({query: dataSql, values: [] });

    const countSql = `SELECT COUNT(*) AS total FROM processed_omr_results`;
    const countResult = await query({ query: countSql, values: [] });
    const totalCount = countResult[0].total;
    res.json({
      success: true,
      results: dataResult,
      pagination: {
        total: totalCount,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching OMR results:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

 