
const { query } = require("../db/db.js");
 
exports.getAllTemplates = async (req, res) => {
  try {
    const sql = `SELECT template_name,ID as template_id FROM template_image_info`;  // SQL to get all templates
    const templates = await query({ query: sql });  
    if (templates.length === 0) {
      return res.status(404).json({ message: "No templates found" });
    }

    res.status(200).json({ results:templates });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
