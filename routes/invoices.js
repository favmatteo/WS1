const express = require('express');
const router = express.Router();

const invoice = require('../databases/DBinvoice');
const user = require('../databases/DBuser');

const { ajv } = require('../lib/middleware/ajv');
const { authenticate, validateSchema, checkPermission, actions } = require('../lib/utility');

const { schemaCreateInvoice, schemaUpdateInvoice } = require('../schemas/validations/invoice');

/**
 * Router for create a new invoice
 * @param {string} date - The date of the invoice
 * @param {integer} amount - The amount of the invoice
 * @param {string} title - The title of the invoice
 * @param {string} typology - The typology of the invoice
 * @param {string} description - The description of the invoice
 * @param {string} id_user - The id of the user of the invoice
 * @param {integer} id_customer - The id of the customer of the invoice
 * @returns {JSON} - The status of invoice created
 */
/**
 * @swagger
 * /invoice/create:
 *   post:
 *     description: Use to create a new invoice
 *     parameters:
 *       - in: body
 *         name: invoice
 *         description: The invoice to create.
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *             amount:
 *               type: number
 *             title:
 *               type: string
 *             typology:
 *               type: string
 *             description:
 *               type: string
 *             id_user:
 *               type: integer
 *             id_customer:
 *               type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal server error
 */
router.post('/create', async (req, res, next) => {
  const data = req.body;
  const validate = ajv.compile(schemaCreateInvoice);

  try {
    validateSchema(validate, data);
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.CREATE);

    const newInvoice = await invoice.createInvoice(
      data.date,
      data.amount,
      data.title,
      data.typology,
      data.description,
      data.id_user,
      data.id_customer,
      data.id_invoice
    );
    res.status(newInvoice.status);
    res.send(newInvoice);
  } catch (error) {
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

/**
 * Router for get all invoices
 * @returns {JSON} - All invoices
 */
/**
 * @swagger
 * /invoice/all:
 *   get:
 *     description: Use to request all invoices
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal server error
 */
router.get('/all', async (req, res, next) => {
  try {
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.READ);

    const allInvoices = await invoice.getInvoice();
    res.status(allInvoices.status);
    res.send(allInvoices);
  } catch (error) {
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

/**
 * Router for get a specific invoice
 * @param {integer} id - The id of the invoice
 * @returns {JSON} - The invoice
 */
router.get('/:id', async (req, res, next) => {
  try {
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.READ);

    const specificInvoice = await invoice.getInvoice(req.params.id);
    res.status(specificInvoice.status);
    res.send(specificInvoice);
  } catch (error) {
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

/**
 * Router for delete a specific invoice
 * @param {integer} id - The id of the invoice
 * @returns {JSON} - The status of invoice deleted
 */
router.delete('/delete/:id', async (req, res, next) => {
  try {
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.DELETE);

    const result = await invoice.deleteInvoice(req.params.id);
    res.status(result.status);
    res.send(result);
  } catch (error) {
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

/**
 * Router for update a specific invoice
 * @param {integer} id - The id of the invoice
 * @returns {JSON} - The status of invoice updated
 */
router.put('/update/:id', async (req, res, next) => {
  const data = req.body;
  const validate = ajv.compile(schemaUpdateInvoice);
  try {
    validateSchema(validate, data);
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.UPDATE);

    const result = await invoice.updateInvoice(req.params.id, data);
    res.status(result.status);
    res.send(result);
  } catch (error) {
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

module.exports = router;
