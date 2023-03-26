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
    const schema = {
        type: "object",
        properties: {
            date: { type: "string" },
            amount: { type: "integer" },
            title: { type: "string" },
            typology: { type: "string" },
            description: { type: "string" },
            id_user: { type: "string" },
            id_customer: { type: "integer" },
        },
        additionalProperties: false,
        required: ["date", "amount", "title", "typology", "description", "id_user", "id_customer"]
    };

    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (valid) {
        // save data in DB
        db.createInvoice(data.date, data.amount, data.title, data.typology, data.description, data.id_user, data.id_customer);
        res.send({ status: valid })


    } else {
        res.send({ status: valid, errors: validate.errors[0].message })
    }

    next();
})


module.exports = router;
