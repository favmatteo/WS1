require('dotenv').config();

const express = require('express');

const app = express();
const port = 3000;

// Middleware
const { useBodyParser } = require('./middleware/body-parser');
const { useDatabase } = require('./middleware/database');
const { router } = require('./routes');
require('./middleware/firebase');

useBodyParser(app);
useDatabase();
app.use(router);

// Create db relations
require('../schemas/relations');

module.exports = {
  app: app,
  port: port,
};
