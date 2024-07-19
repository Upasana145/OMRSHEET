// const fs = require('fs');
// const path = require('path');

// // Data to be written to the CSV file
// const data = [
//   ["name", "age", "is_student"],
//   ["John", 25, true],
//   ["Alice", 30, false],
//   ["Bob", 22, true],
//   ["Eve", 28, false],
//   ["Mike", 35, true],
//   ["Sara", 27, false],
//   ["Tom", 31, true],
//   ["Emma", 26, false]
// ];

// // Convert array to CSV string
// const csvContent = data.map(row => row.join(",")).join("\n");

// // Write CSV string to file
// const filePath = path.join(__dirname, 'data.csv');
// fs.writeFile(filePath, csvContent, (err) => {
//   if (err) {
//     console.error('Error writing to CSV file', err);
//   } else {
//     console.log('CSV file created successfully at', filePath);
//   }
// });

const fs = require("fs");
const path = require("path");

// Data to be written to the CSV file
const data = [
  [123, "John", true, 45.67], // integer, string, boolean, float
  [30.5, "Alice", false, 789], // float, string, boolean, integer
  [25.123456789, "Bob", 1234567890123456789n, 98.76], // double, string, bigint, float
  [28, "Eve", false, 1234], // integer, string, boolean, integer
  [35.7, "Mike", true, 56.78],
];

// Convert array to CSV string
const csvContent = data.map((row) => row.join(",")).join("\n");

// Write CSV string to file
const filePath = path.join(__dirname, "data.csv");
fs.writeFile(filePath, csvContent, (err) => {
  if (err) {
    console.error("Error writing to CSV file", err);
  } else {
    console.log("CSV file created successfully at", filePath);
  }
});
