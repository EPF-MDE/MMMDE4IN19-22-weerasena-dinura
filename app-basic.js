const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

app.use(
  basicAuth({
    users: { admin: "supersecret" },
    challenge: true,
  })
);

app.use("/",(req,res) => {
  res.send("Success")
});


module.exports = app;
