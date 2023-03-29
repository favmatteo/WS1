const express = require('express');
const router = express.Router();

const invoice = require('../databases/DBinvoice');
const { ajv } = require('../lib/app');

const { schemaCreateInvoice: schema } = require('../schemas/validations/invoice');
const validate = ajv.compile(schema);

/**
 * Router for create a new invoice
 * @param {date} date - The date of the invoice
 * @param {integer} amount - The amount of the invoice
 * @param {string} title - The title of the invoice
 * @param {string} typology - The typology of the invoice
 * @param {string} description - The description of the invoice
 * @param {string} id_user - The id of the user of the invoice
 * @param {integer} id_customer - The id of the customer of the invoice
 * @returns {object} - The status of invoice created
 */
router.post('/create', (req, res, next) => {
    const data = req.body;
    const valid = validate(data);

    if (valid) {
        invoice.createInvoice(data.date, data.amount, data.title, data.typology, data.description, data.id_user, data.id_customer)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send({ status: "Unknown error", message: error.message })
            });
    } else {
        res.send({ status: "error", errors: validate.errors[0].message })
    }
})

/**
 * Router for get all invoices
 * @returns {object} - All invoices
 */
router.get('/all', (req, res, next) => {
    invoice.getInvoice()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send({ status: "Unknown error", message: error.message })
        });
});

/**
 * Router for get a specific invoice
 * @param {integer} id - The id of the invoice
 * @returns {object} - The invoice
 */
router.get('/:id', (req, res, next) => {
    invoice.getInvoice(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send({ status: "Unknown error", message: error.message })
        });
});

module.exports = router;
