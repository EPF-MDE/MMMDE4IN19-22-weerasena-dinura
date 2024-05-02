const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

app.use(
  basicAuth({
    users: { admin: "supersecret2" },
    challenge: true,
  })
);

module.exports = app;
