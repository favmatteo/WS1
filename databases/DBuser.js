const { User } = require('../schemas/user');

/**
 * Function that creates a user and save him/her in the database
 * @param {string} id_user  - The id of the user
 * @param {string} name  - The name of the user
 * @param {string} surname - The surname of the user
 * @param {string} email - The email of the user
 * @param {string} photo  - The photo of the user
 * @param {integer} id_role - The id of the role of the user
 * @returns {object} - The status of user created
 */
async function createUser(id_user, name, surname, email, photo, id_role) {
    try {
        await User.create({
            id_user: id_user,
            name: name,
            surname: surname,
            email: email,
            photo: photo,
            id_role: id_role
        })
        return { status: "ok", message: "User created!" }
    } catch (error) {
        return { status: "error", message: "Error while creating user!", why: error.message }
    }
}

module.exports = {
    createUser: createUser,
}
