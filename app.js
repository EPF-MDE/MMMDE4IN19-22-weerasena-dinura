// Import the Express.js framework
const express = require('express')

// Create an Express application instance
const app = express()

// Define the port number on which the server will listen
const port = 3000

// Define a route for the root URL ('/') that responds with 'Hello World!'
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start the Express server and listen for incoming connections on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
