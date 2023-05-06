require('dotenv').config();

const express = require('express');

const app = express();
const port = 3000;

// Middleware
const { useBodyParser } = require('./middleware/body-parser');
const { useDatabase } = require('./middleware/database');
const { router } = require('./routes');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

require('./middleware/firebase');

useBodyParser(app);
useDatabase();
app.use(router);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API',
      description: 'API Information',
    },
    securityDefinitions: {
      basicAuth: {
        type: 'basic',
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Create db relations
require('../schemas/relations');

module.exports = {
  app: app,
  port: port,
};
