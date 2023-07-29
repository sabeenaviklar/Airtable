// const axios = require('axios');

// const apiKey = 'key5A6uNL9slT8rGQ';
// const baseId = 'appRk6LaL7G0NXqao';
// const tableName = 'UserData';
// const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

// async function fetchDataFromAirtable() {
//     try {
//       const response = await axios.get(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//         },
//       });
  
//       // Return the extracted records
//       return response.data.records;
//     } catch (error) {
//       console.error('Error fetching data from Airtable:', error);
//       return null;
//     }
//   }
  
//   async function displayData() {
//     const records = await fetchDataFromAirtable();
  
//     if (records) {
//       // Assuming your table has a field named "Name"
//       records.forEach((record) => {
//         console.log(record.fields.First_Name);
//       });
//     }
//   }
  
//   displayData();

const http = require('http');
const axios = require('axios');

const hostname = '127.0.0.1';
const port = 3000;

const apiKey = 'key5A6uNL9slT8rGQ';
const baseId = 'appRk6LaL7G0NXqao';
const tableName = 'UserData';
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

// async function fetchDataFromAirtable() {
//     try {
//       const response = await axios.get(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//         },
//       });
  
//       // Return the extracted records
//       return response.data.records;
//     } catch (error) {
//       console.error('Error fetching data from Airtable:', error);
//       return null;
//     }
//   }
  
//   async function displayData() {
//     const records = await fetchDataFromAirtable();
  
//     if (records) {
//       // Assuming your table has a field named "Name"
//       records.forEach((record) => {
//         console.log(record.fields.First_Name);
//         console.log(record.fields.Last_Name);
//         console.log(record.fields.Status);
//       });
//     }
//   }
  
//   displayData();

//   const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
//   });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
  
        const records = response.data.records;
        const data = records.map((record) => {
          return {
            name: record.fields.First_Name,
            lastName: record.fields.Last_Name,
            status: record.fields.Status, // Assuming "Status" field in your Airtable
          };
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data from Airtable:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Failed to fetch data from Airtable');
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
  
  
  server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });