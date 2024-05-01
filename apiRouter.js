// Import required modules
const express = require('express');
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

module.exports = apiRouter;
