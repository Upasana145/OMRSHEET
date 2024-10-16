const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

module.exports.query = async ({ query, values }) => {
  try {
    let res = await pool.execute(query, values);
    console.log("Query Result:", res);
    return res[0];
  } catch (err) {
    console.error("Query failed:", err);
    throw err;
  }
};
