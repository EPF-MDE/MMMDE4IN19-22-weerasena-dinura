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
  res.send('Hello World!! It workss')
})

app.get('/students', (req, res) => {
   const students = [
    { name: "Dewmith WEERASENA", school: "EPF" },
    { name: "Harry Potter", school: "Poudlard" }
  ];

  // Send the array of student information as the response
  res.send(students);
});

// Start the Express server and listen for incoming connections on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server is running`)
  

})
