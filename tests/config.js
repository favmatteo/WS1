require('dotenv').config();

const { app } = require('../lib/app');
const { sequelize } = require('../lib/database');
const request = require('supertest');

module.exports = {
  app: app,
  sequelize: sequelize,
  request: request,
};
