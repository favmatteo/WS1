const { auth } = require('./middleware/firebase');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const serialize = require('../serializer/serialize.js');

function extractBasicAuthentication(basicString) {
    const base64Credentials = basicString.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    return credentials.split(':');
}

function getEmail(basicString) {
    return extractBasicAuthentication(basicString)[0];
}

function getPassword(basicString) {
    return extractBasicAuthentication(basicString)[1];
}


function validateSchema(validate, data) {
    const validated = validate(data);
    if (!validated) {
        throw { status: 400, message: "Bad Request", why: validate.errors[0].message };
    }
}

async function authenticate(header) {
    if (header === undefined) throw { status: 401, message: "Unauthorized", why: "No authorization header" };

    try {
        const [email, password] = extractBasicAuthentication(header);
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        throw { status: 401, message: "Unauthorized", why: error.message };
    }
}

async function checkPermission(header, permission) {
    const email = getEmail(header);
    const { getUserPermission } = require('../databases/DBuser');
    let userPermission = await getUserPermission(email);
    userPermission = serialize.serializeOutputDB(userPermission)[0].role.permissions[0];
    const permissions = Object.keys(userPermission);
    const permissionName = permissions[permission - 1];
    if (!userPermission[permissionName]) throw { status: 403, message: "Forbidden", why: "You don't have permission to do this action" };
}

const actions = {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4,
}

module.exports = {
    extractBasicAuthentication: extractBasicAuthentication,
    authenticate: authenticate,
    validateSchema: validateSchema,
    checkPermission: checkPermission,
    getEmail: getEmail,
    getPassword: getPassword,
    actions: actions,
}