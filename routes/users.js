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
    const schema = {
        type: "object",
        properties: {
            id_user: { type: "string" },
            name: { type: "string" },
            surname: { type: "string" },
            email: { type: "string" },
            photo: { type: "string" },
            id_role: { type: "integer" },
        },
        additionalProperties: false,
        required: ["id_user", "name", "surname", "email", "photo", "id_role"]
    };

    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (valid) {
        res.send({ status: valid })
        // save data in DB
        db.createUser(data.id_user, data.name, data.surname, data.email, data.photo, data.id_role);
    } else {
        res.send({ status: valid, errors: validate.errors[0].message })
    }

    next();
})

module.exports = router;
