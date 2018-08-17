const express = require('express');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const ev = require('express-validation');

const { DEV_MODE, API_PORT, API_V1 } = require('./config');
const api = require('./api');

// Create Express server
const app = express();

// Setup host and port
app.set('host', '0.0.0.0');
app.set('port', API_PORT);

// Setup middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Setup API routes
app.use(API_V1, api);

// Setup Error Handler
/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  if (err instanceof ev.ValidationError) {
    // Validation-specific
    return res.status(err.status).json(err);
  }
  // Show stack trace in DEV mode
  if (DEV_MODE) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.stack);
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
});

module.exports = app;
