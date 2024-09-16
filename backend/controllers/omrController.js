const fs = require('fs');
const path = require('path');
const { query } = require("../db/db.js");

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};


exports.uploadOMR = async (req, res) => {
  const { template_id, batch_name, files } = req.body; 
  if (!template_id || !batch_name || !files || !Array.isArray(files)) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  try {
    const sql = `SELECT template_name FROM template_image_info WHERE ID = ?`;
    const result = await query({ query: sql, values: [template_id] }); 
    if (result.length === 0) {
      return res.status(422).json({ message: 'Invalid template ID' });
    }

    const template_name = result[0].template_name;
    const batchDir = path.join(__dirname, '../uploads', template_name, batch_name); 
    ensureDirectoryExists(batchDir); 
    const fileEntries = [];
    for (const file of files) {
      if (!file.base64 || !file.fileName) {
        console.warn('File is missing base64 data or filename:', file);
        continue;
      } 
      const base64Data = file.base64.replace(/^data:image\/jpeg;base64,/, '');
      const filePath = path.join(batchDir, file.fileName);

      try { 
        fs.writeFileSync(filePath, base64Data, 'base64'); 
        const relativeFilePath = path.join('uploads', template_name, batch_name, file.fileName); 
        await query({
          query: `INSERT INTO processed_omr_results (template_name, template_id, batch_name, ques_paper_image_path) VALUES (?, ?, ?, ?)`,
          values: [template_name, template_id, batch_name, relativeFilePath]
        }); 

        fileEntries.push({
          template_id,
          batch_name,
          file_path: relativeFilePath,
        });

      } catch (writeError) {
        res.status(422).json({ message: 'Unable to upload', files: fileEntries }); 
      }
    }

    res.status(200).json({ message: 'OMR sheets uploaded successfully', files: fileEntries });
  } catch (error) { 
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
          o.template_id, 
          o.batch_name, 
          o.ques_paper_image_path, 
          o.created_at, 
          o.updated_at, 
          t.template_name 
        FROM processed_omr_results o
        JOIN template_image_info t ON o.template_id = t.ID
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

 