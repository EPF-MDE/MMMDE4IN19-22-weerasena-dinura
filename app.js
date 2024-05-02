// Import required modules
const express = require('express');
const basicAuth = require('express-basic-auth'); // Import express-basic-auth
const fs = require('fs');
const path = require('path');
const csvModule = require('./csvModule'); // Our custom CSV module

// Define custom async authorizer function
function myAuthorizer(username, password, callback) {
    setTimeout(() => {
        // Check if username is 'admin' and password is 'supersecret'
        const userMatches = basicAuth.safeCompare(username, 'admin');
        const passwordMatches = basicAuth.safeCompare(password, 'supersecret');
        
        // Call the callback function with the result
        callback(null, userMatches && passwordMatches);
    }, 0); // Simulating asynchronous operation
}

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

// Mount the custom async authorizer function for Basic Auth
app.use(
  basicAuth({
    authorizer: myAuthorizer,
    // Authorization schema needs to read a file: it is asynchronous
    authorizeAsync: true,
    challenge: true,
  })
);

// Create an Express router for /api/* endpoints
const apiRouter = express.Router();

apiRouter.get('/students', (req, res) => {
    const students = csvModule.getStudents(); // Get student data from CSV module
    res.json(students);
});

apiRouter.post('/students/create', (req, res) => {
    const { name, school } = req.body; // Extract student data from request body
    csvModule.addStudent(name, school); // Add student to CSV file using CSV module
    res.send('Student saved');
});

// Mount the /api/* router
app.use('/api', apiRouter);

// Define HTML page rendering route
app.get('/students', (req, res) => {
    const students = csvModule.getStudents(); // Get student data from CSV module
    res.render('students', { students }); //Rendering to students.ejs view to display the form
});

// Define GET endpoint to render the form
app.get('/students/create', (req, res) => {
    res.render('create-student'); // Render the create-student.ejs view to display the form
});

// Define POST endpoint to handle form submission
app.post('/students/create', (req, res) => {
    const { name, school } = req.body; // Extract student data from request body
    csvModule.addStudent(name, school); // Add student to CSV file using CSV module
    res.redirect('/students/create');// Redirect back to the form to add another student
});

// Serve the home.html file at the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"));
});

// Define the port number on which the server will listen
const PORT = process.env.PORT || 3000;

// Start the Express server and listen for incoming connections on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
