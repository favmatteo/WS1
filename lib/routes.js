const express = require('express');
const router = express.Router();

const invoice = require('../routes/invoices');
const user = require('../routes/users');

router.use('/invoice', invoice);
router.use('/user', user);

module.exports = {
  router: router,
};
