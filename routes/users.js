const express = require('express');
const router = express.Router();

const user = require('../databases/DBuser');
const { ajv } = require('../lib/middleware/ajv');

const { authenticate, validateSchema } = require('../lib/utility');


const { schemaCreateUser: schema } = require('../schemas/validations/user');
const validate = ajv.compile(schema)


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
router.post('/create', async (req, res, next) => {
    const data = req.body;
    try {
        validateSchema(validate, data)
        await authenticate(req.headers.authorization)

        const newUser = await user.createUser(data.id_user, data.name, data.surname, data.email, data.photo, data.id_role);
        res.status(newUser.status);
        res.send(newUser);
    } catch (error) {
        res.status(error.status ? error.status : 500);
        res.send(error);
    }
})


router.get('/all', async (req, res, next) => {
    try {
        await authenticate(req.headers.authorization);

        const specificUser = await user.getUser();
        res.status(specificUser.status);
        res.send(specificUser);

    } catch (error) {
        res.status(error.status ? error.status : 500);
        res.send(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await authenticate(req.headers.authorization);

        const specificUser = await user.getUser(req.params.id);
        res.status(specificUser.status);
        res.send(specificUser);

    } catch (error) {
        res.status(error.status ? error.status : 500);
        res.send(error);
    }
});

module.exports = router;