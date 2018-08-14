import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';

import { DEV_MODE, API_PORT, API_V1 } from './config';
import api from './api';

// Create Express server
const app = express();

// Setup host and port
app.set('host', '0.0.0.0');
app.set('port', API_PORT);

// Setup middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup dev-specific middleware
if (DEV_MODE) {
  app.use(errorHandler());
}

// Setup API routes
app.use(API_V1, api);

export default app;
