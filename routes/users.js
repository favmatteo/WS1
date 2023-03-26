const express = require('express');
const router = express.Router();

const db = require('../lib/DBConnection');
const { ajv } = require('../lib/app');

router.get('/', (req, res, next) => {
    res.send({ name: "Matteo" });
    next();
})

router.post('/create', (req, res, next) => {
    const data = req.body;
    const { schemaCreateUser: schema } = require('../lib/ajvSchemas');
    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (valid) {
        db.createUser(data.id_user, data.name, data.surname, data.email, data.photo, data.id_role)
            .then((result) => {
                res.send(result)
            })
            .catch((error) => {
                res.send({ status: "Unknown error", message: error.message })

            });
    } else {
        res.send({ status: valid, errors: validate.errors[0].message })
    }
})

module.exports = router;
