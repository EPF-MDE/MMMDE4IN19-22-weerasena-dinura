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

//Reading CSV by splitting the data into differnt rows while also categorising into name and scool.
app.get("/student_info-csv", (req, res) => {
  fs.readFile("./students_info.csv", "utf8", (err, data) => {
    if (err) {
      // If there's an error reading the file, send an error response
      return res.status(500).send("Error reading CSV file");
    }
    
    // Split the CSV data into rows
    const rows = data.split("\n");
    
    // Initialize an array to store the parsed CSV data
    const parsedData = [];

    // Extract headers from the first row
    const headers = rows[0].trim().split(";");

    // Loop through each row starting from index 1 (skip header row)
    for (let i = 1; i < rows.length; i++) {
      // Split the row into cells
      const cells = rows[i].trim().split(";");

      // Create an object to store the cell values
      const student = {};

      // Assign values to object properties using headers
      for (let j = 0; j < headers.length; j++) {
        student[headers[j].toLowerCase()] = cells[j];
      }

      // Push the student object to the parsed data array
      parsedData.push(student);
    }

    // Send the parsed CSV data as the response
    res.json(parsedData);
  });
});

// Creating new instances and saving to csv
app.post('/students/create', (req, res) => {
  // Extract student data from request body
  const { name, school } = req.body;

  // Create a CSV string for the new student
  const newStudentCSV = `${name};${school}\n`;

  // Append the new student data to the CSV file
  fs.appendFile('./students_info.csv', newStudentCSV, (err) => {
    if (err) {
      // If there's an error appending to the file, send an error response
      return res.status(500).send('Error saving student data');
    }

    // Send "Student saved" response
    res.send('Student saved');
  });
});




// Start the Express server and listen for incoming connections on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server is running`)
  

})
