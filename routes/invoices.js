const express = require('express');
const router = express.Router();

const invoice = require('../databases/DBinvoice');
const { ajv } = require('../lib/middleware/ajv');
const { authenticate, validateSchema } = require('../lib/utility');

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
router.post('/create', async (req, res, next) => {
    const data = req.body;
    const validate = ajv.compile(schemaCreateInvoice);

    try {
        validateSchema(validate, data)
        await authenticate(req.headers.authorization)

        const newInvoice = await invoice.createInvoice(data.date, data.amount, data.title, data.typology, data.description, data.id_user, data.id_customer, data.id_invoice);
        res.status(newInvoice.status);
        res.send(newInvoice);
    } catch (error) {
        res.status(error.status ? error.status : 500);
        res.send(error);
    }
})

/**
 * Router for get all invoices
 * @returns {JSON} - All invoices
 */
router.get('/all', async (req, res, next) => {
    try {
        await authenticate(req.headers.authorization)

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
        await authenticate(req.headers.authorization)

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
        await authenticate(req.headers.authorization)

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
        validateSchema(validate, data)
        await authenticate(req.headers.authorization)

        const result = await invoice.updateInvoice(req.params.id, data);
        res.status(result.status);
        res.send(result);
    } catch (error) {
        res.status(error.status ? error.status : 500);
        res.send(error);
    }
});

module.exports = router;