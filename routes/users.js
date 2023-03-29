const express = require('express');
const router = express.Router();

const user = require('../databases/DBuser');
const { ajv } = require('../lib/app');

/**
 * Router for create a new user
 * @param {string} id_user - The id of the user
 * @param {string} name - The name of the user
 * @param {string} surname - The surname of the user
 * @param {string} email - The email of the user
 * @param {string} photo - The photo of the user
 * @param {integer} id_role - The id of the role of the user
 * @returns {object} - The status of user created
 */
router.post('/create', (req, res, next) => {
    const data = req.body;
    const { schemaCreateUser: schema } = require('../schemas/validations/user');
    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (valid) {
        user.createUser(data.id_user, data.name, data.surname, data.email, data.photo, data.id_role)
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
