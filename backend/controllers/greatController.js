// controllers/greatController.js

const pool = require("../db/db");

async function testConnection(req, res) {
  const client = await pool.connect();
  try {
    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS great(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      );
    `);

    // Insert a record
    const insertResult = await client.query(
      `
      INSERT INTO great (name) VALUES ($1) RETURNING *;
    `,
      ["Test Name"]
    );

    // Retrieve the inserted record
    const selectResult = await client.query(
      `
      SELECT * FROM great WHERE id = $1;
    `,
      [insertResult.rows[0].id]
    );

    res.json({
      insertResult: insertResult.rows[0],
      selectResult: selectResult.rows[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Database error" });
  } finally {
    client.release();
  }
}

module.exports = {
  testConnection,
};
