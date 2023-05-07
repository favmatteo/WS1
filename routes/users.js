const express = require('express');
const router = express.Router();

const user = require('../databases/DBuser');
const { ajv } = require('../lib/middleware/ajv');

const { authenticate, validateSchema, checkPermission, actions } = require('../lib/utility');

const { schemaCreateUser: schema } = require('../schemas/validations/user');
const validate = ajv.compile(schema);

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
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Creates a new user.
 *     description: Use this API to create a new user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             id_user:
 *               type: string
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             email:
 *               type: string
 *             photo:
 *               type: string
 *             id_role:
 *               type: integer
 *     responses:
 *       '200':
 *         description: The user was successfully created.
 *       '400':
 *         description: The request was invalid.
 *       '401':
 *         description: The request requires authentication.
 *       '403':
 *         description: The server understood the request, but is refusing to fulfill it.
 *       '500':
 *         description: An error occurred while processing the request.
 *     tags:
 *       - User
 */

router.post('/create', async (req, res, next) => {
  const data = req.body;
  try {
    validateSchema(validate, data);
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.CREATE);

    const newUser = await user.createUser(data.id_user, data.name, data.surname, data.email, data.photo, data.id_role);
    res.status(newUser.status);
    res.send(newUser);
  } catch (error) {
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

/**
 * @swagger
 * /user/all:
 *   get:
 *     description: Use to request all users
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
 *     tags:
 *       - User
 */
router.get('/all', async (req, res, next) => {
  try {
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.READ);

    const specificUser = await user.getUserById();
    res.status(specificUser.status);
    res.send(specificUser);
  } catch (error) {
    console.log(error);
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     description: Use to request a specific user
 *     parameters:
 *      - in: path
 *        name: id
 *        description: The id of the user
 *        required: true
 *        schema:
 *          type: string
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
 *     tags:
 *       - User
 */
router.get('/:id', async (req, res, next) => {
  try {
    await authenticate(req.headers.authorization);
    await checkPermission(req.headers.authorization, actions.READ);

    const specificUser = await user.getUserById(req.params.id);
    res.status(specificUser.status);
    res.send(specificUser);
  } catch (error) {
    res.status(error.status ? error.status : 500);
    res.send(error);
  }
});

module.exports = router;
