import React from 'react';
import { Parser } from 'json2csv';

const ExportCSV = () => {
  // Sample JSON data
  const jsonData = [
    {
      name: "John Doe",
      age: 30,
      email: "john@example.com"
    },
    {
      name: "Jane Smith",
      age: 25,
      email: "jane@example.com"
    }
  ];

  const fields = ['name', 'age', 'email']; // CSV column names

  const downloadCSV = () => {
    try {
      // Parse the JSON data to CSV format
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(jsonData);

      // Create a Blob from the CSV string and download it
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      link.click();
    } catch (err) {
      console.error('Error while converting to CSV:', err);
    }
  };

  return (
    <div>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default ExportCSV;
