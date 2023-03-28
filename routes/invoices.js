const express = require('express');
const router = express.Router();

const db = require('../lib/DBConnection');
const { ajv } = require('../lib/app');



router.get('/', (req, res, next) => {
    res.send({ invoice: "created" });
    next();
})

router.post('/create', (req, res, next) => {
    const data = req.body;
    const { schemaCreateInvoice: schema } = require('../schemas/validations/invoice');
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
        db.createInvoice(data.date, data.amount, data.title, data.typology, data.description, data.id_user, data.id_customer)
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


module.exports = router;
