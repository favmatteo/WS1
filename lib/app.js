const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const Ajv = require('ajv');
const ajv = new Ajv();

const passwords = fs.readFileSync(__dirname + '/../.passwords.json', 'utf-8');
const db_password = JSON.parse(passwords).db;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    'acl',
    'doadmin',
    db_password,
    {
        host: 'db-mysql-fra1-04517-do-user-13540651-0.b.db.ondigitalocean.com',
        port: 25060,
        dialect: 'mysql'
    }
);

module.exports = {
    app: app,
    port: port,
    sequelize: sequelize,
    Sequelize: Sequelize,
    ajv: ajv,
}