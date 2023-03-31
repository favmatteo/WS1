const { auth } = require('./middleware/firebase');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");


function extractBasicAuthentication(basicString) {
    const base64Credentials = basicString.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    return credentials.split(':');
}

function validateSchema(validate, data) {
    const validated = validate(data);
    if (!validated) {
        throw { status: 400, message: "Bad Request", why: validate.errors[0].message };
    }
}

async function authenticate(header) {
    try {
        const [username, password] = extractBasicAuthentication(header);
        await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
        throw { status: 401, message: "Unauthorized", why: error.message };
    }
}

module.exports = {
    extractBasicAuthentication: extractBasicAuthentication,
    authenticate: authenticate,
    validateSchema: validateSchema,
}