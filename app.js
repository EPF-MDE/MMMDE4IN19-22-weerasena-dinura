// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const csvModule = require('./csvModule'); // Our custom CSV module

// Create an Express router for /api/* endpoints
const apiRouter = express.Router();

// Define routes for /api/* endpoints
apiRouter.get('/students', (req, res) => {
  // Get student data from CSV module
  const students = csvModule.getStudents();
  res.json(students);
});

apiRouter.post('/students/create', (req, res) => {
  // Extract student data from request body
  const { name, school } = req.body;
  // Add student to CSV file using CSV module
  csvModule.addStudent(name, school);
  res.send('Student saved');
});

// Create an Express application instance
const app = express();

// Set up EJS template engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware to parse urlencoded form data
app.use(express.urlencoded({ extended: true }));

// For CSS files
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the /api/* router
app.use('/api', apiRouter);

// Define HTML page rendering route
app.get('/students', (req, res) => {
  // Get student data from CSV module
  const students = csvModule.getStudents();
  // Render the "students" view and pass the student data
  res.render('students', { students });
});

// Define GET endpoint to render the form
app.get('/students/create', (req, res) => {
  // Render the create-student.ejs view to display the form
  res.render('create-student');
});

// Define POST endpoint to handle form submission
app.post('/students/create', (req, res) => {
  // Extract student data from request body
  const { name, school } = req.body;
  // Add student to CSV file using CSV module
  csvModule.addStudent(name, school);
  // Redirect back to the form to add another student
  res.redirect('/students/create');
});

// Define the port number on which the server will listen
const PORT = process.env.PORT || 3000;

// Start the Express server and listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
