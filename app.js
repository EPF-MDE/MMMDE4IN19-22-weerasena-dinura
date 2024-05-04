// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const basicAuth = require('express-basic-auth'); // Import express-basic-auth
const fs = require('fs');
const path = require('path');
const csvModule = require('./csvModule'); // Our custom CSV module

// Async authorizer function
async function authorizer(username, password, cb) {
    const rowSeparator = "\r\n";
    const cellSeparator = ";";
    try {
        const data = await fs.promises.readFile("users.csv", "utf8");
        const rows = data.split(rowSeparator);
        const [headerRow, ...contentRows] = rows;
        const header = headerRow.split(cellSeparator);
        const admins = contentRows.map(row => {
            const cells = row.split(cellSeparator);
            const admin = {
                username: cells[0],
                password: cells[1]
            };
            return admin;
        });
        console.log("admins", admins);
        for (const admin of admins) {
            console.log("admin", admin);
            const usernameMatch = basicAuth.safeCompare(username, admin.username);
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (usernameMatch && passwordMatch) {
                console.log("accept");
                return cb(null, true);
            }
        }
        console.log("Login Failed");
        return cb(null, false);
    } catch (error) {
        console.error('Error reading users from CSV:', error);
        return cb(error);
    }
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
        // Final auth, based on a file with encrypted passwords
        authorizer: authorizer,
        // Our authorization schema needs to read a file: it is asynchronous
        authorizeAsync: true,
        challenge: true,
    })
);

// Create an Express router for /api/* endpoints
const apiRouter = express.Router();

apiRouter.get('/students', (req, res) => {
    // Get student data from CSV module synchronously
    const students = csvModule.readcsv('students_info.csv');
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
    // Get student data from CSV module synchronously
    const students = csvModule.readcsv('students_info.csv');
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
    res.redirect('/students/create'); // Redirect back to the form to add another student
});

// Serve the home.html file at the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"));
});

// Define the port number on which the server will listen
const PORT = process.env.PORT || 3001;

// Start the Express server and listen for incoming connections on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
