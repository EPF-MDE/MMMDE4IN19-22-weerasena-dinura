// Import the Express.js framework
const express = require('express');

// Importing fs to read the file
const fs = require("fs");

// Create an Express application instance
const app = express();

const path = require('path');

// Set up EJS template engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware to parse urlencoded form data
app.use(express.urlencoded({ extended: true }));

// For CSS files
app.use(express.static('public'));


// Define the port number on which the server will listen
const PORT = process.env.PORT || 3000;

// Adding to read json bodies
app.use(express.json());

// Defining endpoint for the index (/) route
app.get('/', (req, res) => {
  // Send the home.html file
  res.sendFile(path.join(__dirname, './views/home.html'));
});

app.get('/api/students', (req, res) => {
  const students = [
    { name: "Dewmith WEERE", school: "EPF" },
    { name: "Harry Potter", school: "Poudlard" }
  ];
  // Send the array of student information as the response
  res.send(students);
});

// Reading CSV by splitting the data into different rows while also categorizing into name and school.
app.get("/api/students_info-csv", (req, res) => {
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


// Define HTML page rendering route
app.get('/students', (req, res) => {
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
    
    // Render the "students" view and pass the parsed data as "students" array
    res.render("students", { students: parsedData });
  });
});



// Creating new instances and saving to csv
app.post('/api/students/create', (req, res) => {
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


// Define GET endpoint to render the form
app.get('/students/create', (req, res) => {
  // Render the create-student.ejs view to display the form
  res.render('create-student');
});

// Define POST endpoint to handle form submission
app.post('/students/create', (req, res) => {
  // Extract student data from request body
  console.log(req.body);
  const { name, school } = req.body;

  // Create a CSV string for the new student
  const newStudentCSV = `\n${name};${school}`;

  // Append the new student data to the CSV file
  fs.appendFile('./students_info.csv', newStudentCSV, (err) => {
    if (err) {
      // If there's an error appending to the file, send an error response
      return res.status(500).send('Error saving student data');
    }

    // Redirect back to the form to add another student
    res.redirect('/students/create');
  });
});



// Start the Express server and listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
