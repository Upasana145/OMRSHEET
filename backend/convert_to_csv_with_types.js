const fs = require("fs");
const path = require("path");

// Sample data with different data types and an additional column
const data = [
  [123, "John", true, 45.67], // integer, string, boolean, float
  [30.5, "Alice", false, 789], // float, string, boolean, integer
  [25.123456789, "Bob", 1234567890123456789n, 98.76], // double, string, bigint, float
  [28, "Eve", false, 1234], // integer, string, boolean, integer
  [35.7, "Mike", true, 56.78], // float, string, boolean, float
];

// Function to convert data to CSV format
const convertToCSV = (data) => {
  return data
    .map((row) =>
      row
        .map((value) => {
          if (typeof value === "string") {
            // Add quotes around strings
            return `"${value.replace(/"/g, '""')}"`;
          } else if (typeof value === "bigint") {
            // Convert bigint to string
            return value.toString();
          } else if (typeof value === "boolean") {
            // Convert boolean to string
            return value.toString();
          }
          // Convert other types (integer, float, double) to string
          return value.toString();
        })
        .join(",")
    )
    .join("\n");
};

// Convert data to CSV
const csvData = convertToCSV(data);

// Define the file path
const filePath = path.join(__dirname, "data_with_all_types_and_columns.csv");

// Write the CSV data to a file
fs.writeFile(filePath, csvData, "utf8", (err) => {
  if (err) {
    console.error("Error writing CSV file:", err);
  } else {
    console.log("CSV file successfully created at", filePath);
  }
});
