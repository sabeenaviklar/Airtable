
const http = require('http');
const axios = require('axios');

const port = 3000;

const apiKey = 'key5A6uNL9slT8rGQ';
const baseId = 'appRk6LaL7G0NXqao';
const tableName = 'UserData';
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

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
            status: record.fields.Status, 
          };
        });
        console.log(data);
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