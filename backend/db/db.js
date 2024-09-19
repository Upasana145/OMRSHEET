const mysql = require("mysql2/promise");

async function query({ query, values = [] }) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  try {
    const [results] = await db.execute(query, values);
    console.log('conentedd')
    await db.end();
    return results;
  } catch (error) {
    console.log('regjected')
    return { error };
  }
}
module.exports = { query };

// for postgrey
// require("dotenv").config();
// const { Pool } = require("pg");

// // Logging environment variables to troubleshoot
// console.log({
//   host: process.env.PG_DB_HOST,
//   port: process.env.PG_DB_PORT,
//   user: process.env.PG_DB_USER,
//   password: process.env.PG_DB_PASSWORD,
//   database: process.env.PG_DB_DATABASE_NAME,
// });

// const pool = new Pool({
//   host: process.PG_DB_HOST,
//   port: process.env.PG_DB_PORT,
//   user: process.env.PG_DB_USER,
//   password: process.env.PG_DB_PASSWORD,
//   database: process.env.PG_DB_DATABASE_NAME,
// });
// module.exports = pool;
// // async function testConnection() {
// //   const client = await pool.connect();
// //   try {
// //     // Create table if not exists
// //     await client.query(`
// //       CREATE TABLE IF NOT EXISTS great(
// //         id SERIAL PRIMARY KEY,
// //         name VARCHAR(100)
// //       );
// //     `);

// //     // Insert a record
// //     const insertResult = await client.query(
// //       `
// //       INSERT INTO great (name) VALUES ($1) RETURNING *;
// //     `,
// //       ["Test Name"]
// //     );

// //     console.log("Insert Result:", insertResult.rows[0]);

// //     // Retrieve the inserted record
// //     const selectResult = await client.query(
// //       `
// //       SELECT * FROM test_table WHERE id = $1;
// //     `,
// //       [insertResult.rows[0].id]
// //     );

// //     console.log("Select Result:", selectResult.rows[0]);
// //   } catch (error) {
// //     console.error("Error:", error);
// //   } finally {
// //     client.release();
// //   }
// // }

// // testConnection();
