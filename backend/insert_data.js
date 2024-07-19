// const fs = require("fs");
// const path = require("path");
// const { Client } = require("pg");
// const csv = require("csv-parser");

// // PostgreSQL connection configuration
// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   password: "123456",
//   database: "obps_pg",
//   port: 5432, // Default port for PostgreSQL
// });

// client
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL database"))
//   .catch((err) => console.error("Connection error", err.stack));

// // Create table if it doesn't exist
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS students (
//     name VARCHAR(255),
//     age INT,
//     is_student BOOLEAN
//   )
// `;

// client
//   .query(createTableQuery)
//   .then(() => console.log("Table created or already exists"))
//   .catch((err) => console.error("Error creating table", err.stack))
//   .finally(() => {
//     // Read CSV file and insert data into table
//     const filePath = path.join(__dirname, "data.csv");
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (row) => {
//         const { name, age, is_student } = row;
//         const insertQuery = `INSERT INTO students (name, age, is_student) VALUES ($1, $2, $3)`;
//         client
//           .query(insertQuery, [name, parseInt(age), is_student === "true"])
//           .then(() => console.log("Row inserted:", row))
//           .catch((err) => console.error("Error inserting row", err.stack));
//       })
//       .on("end", () => {
//         console.log("CSV file successfully processed");
//         client.end();
//       });
//   });

// const fs = require("fs");
// const path = require("path");
// const { Client } = require("pg");
// const csv = require("csv-parser");

// // PostgreSQL connection configuration
// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   password: "123456",
//   database: "obps_pg",
//   port: 5432, // Default port for PostgreSQL
// });

// client
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL database"))
//   .catch((err) => console.error("Connection error", err.stack));

// // Create table if it doesn't exist
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS students (
//     name VARCHAR(255),
//     age INT,
//     is_student BOOLEAN
//   )
// `;

// client
//   .query(createTableQuery)
//   .then(() => console.log("Table created or already exists"))
//   .catch((err) => console.error("Error creating table", err.stack));

// const processCSV = async () => {
//   const filePath = path.join(__dirname, "data.csv");
//   const queries = [];

//   return new Promise((resolve, reject) => {
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (row) => {
//         const { name, age, is_student } = row;
//         const insertQuery = `INSERT INTO students (name, age, is_student) VALUES ($1, $2, $3)`;
//         queries.push(
//           client.query(insertQuery, [
//             name,
//             parseInt(age),
//             is_student === "true",
//           ])
//         );
//       })
//       .on("end", () => {
//         Promise.all(queries)
//           .then(() => {
//             console.log("All rows inserted");
//             resolve();
//           })
//           .catch((err) => {
//             console.error("Error inserting rows", err);
//             reject(err);
//           });
//       });
//   });
// };

// processCSV()
//   .then(() => {
//     client.end();
//     console.log("CSV file successfully processed and connection closed");
//   })
//   .catch((err) => {
//     client.end();
//     console.error("Error processing CSV file", err);
//   });

// ******************************************************
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const csv = require("csv-parser");

// PostgreSQL connection configuration
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "obps_pg",
  port: 5432, // Default port for PostgreSQL
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

// Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    name VARCHAR(255),
    age INT,
    is_student BOOLEAN
  )
`;

client
  .query(createTableQuery)
  .then(() => console.log("Table created or already exists"))
  .catch((err) => console.error("Error creating table", err.stack));

// Function to determine the type of value and return an appropriate object
const parseRow = (row) => {
  const result = { name: null, age: null, is_student: null };

  row.forEach((value) => {
    if (!isNaN(value) && Number.isInteger(parseFloat(value))) {
      // If it's an integer
      result.age = parseInt(value);
    } else if (value === "true" || value === "false") {
      // If it's a boolean
      result.is_student = value === "true";
    } else {
      // Otherwise, treat it as a string
      result.name = value;
    }
  });

  return result;
};

const processCSV = async () => {
  const filePath = path.join(__dirname, "data.csv");
  const queries = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ headers: false }))
      .on("data", (row) => {
        const parsedRow = parseRow(Object.values(row));
        const { name, age, is_student } = parsedRow;

        if (name !== null && age !== null && is_student !== null) {
          const insertQuery = `INSERT INTO students (name, age, is_student) VALUES ($1, $2, $3)`;
          queries.push(client.query(insertQuery, [name, age, is_student]));
        } else {
          console.error("Invalid row data:", row);
        }
      })
      .on("end", () => {
        Promise.all(queries)
          .then(() => {
            console.log("All rows inserted");
            resolve();
          })
          .catch((err) => {
            console.error("Error inserting rows", err);
            reject(err);
          });
      });
  });
};

processCSV()
  .then(() => {
    client.end();
    console.log("CSV file successfully processed and connection closed");
  })
  .catch((err) => {
    client.end();
    console.error("Error processing CSV file", err);
  });

// ******************************************
// const fs = require("fs");
// const path = require("path");
// const { Client } = require("pg");
// const csv = require("csv-parser");

// // PostgreSQL client configuration
// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   password: "123456",
//   database: "obps_pg",
//   port: 5432, // Default port for PostgreSQL
// });

// // Connect to PostgreSQL
// client
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL database"))
//   .catch((err) => console.error("Connection error", err.stack));

// // Absolute path to the CSV file
// const filePath = path.resolve(__dirname, "data_with_all_types_and_columns.csv");

// // Function to insert data into PostgreSQL
// const insertData = async () => {
//   try {
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", async (row) => {
//         try {
//           // Extract and convert data from CSV row
//           const integerColumn = parseInt(row["column1"]) || null;
//           const stringColumn = row["column2"] || null;
//           const booleanColumn = row["column3"] === "true" || null;
//           const floatColumn = parseFloat(row["column4"]) || null;

//           // Prepare SQL query
//           const query = `
//             INSERT INTO data_table (integer_column, string_column, boolean_column, float_column)
//             VALUES ($1, $2, $3, $4);
//           `;

//           // Execute SQL query
//           await client.query(query, [
//             integerColumn,
//             stringColumn,
//             booleanColumn,
//             floatColumn,
//           ]);

//           console.log("Row inserted successfully:", row);
//         } catch (err) {
//           console.error("Error inserting row:", err);
//         }
//       })
//       .on("end", () => {
//         console.log("CSV file successfully processed");
//         client.end().then(() => console.log("Disconnected from PostgreSQL"));
//       });
//   } catch (err) {
//     console.error("Error processing CSV file:", err);
//     client.end().then(() => console.log("Disconnected from PostgreSQL"));
//   }
// };

// // Run the insertData function
// insertData();
