// Import the Express.js framework
const express = require('express')

//Importing fs to read the file
const fs = require("fs")

// Create an Express application instance
const app = express()

// Define the port number on which the server will listen
const port = 3000

// Define a route for the root URL ('/') that responds with 'Hello World!'
app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.get('/students', (req, res) => {
   const students = [
    { name: "Dewmith WEERE", school: "EPF" },
    { name: "Harry Potter", school: "Poudlard" }
  ];

  // Send the array of student information as the response
  res.send(students);
});

//Reading CSV
app.get('/read-csv', (req, res) => {
  // Define the file path
  const filePath = __dirname + '/student_info.csv';

  // Read the CSV file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CSV file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Log the content of the CSV file
    console.log('CSV File Content:');
    console.log(data);

    res.send('CSV file content logged to console.');
  });
});

// Start the Express server and listen for incoming connections on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server is running`)
  

})
