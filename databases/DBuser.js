const { Role } = require('../schemas/role');
const { User } = require('../schemas/user');
const { Permission } = require('../schemas/permission');

/**
 * Function that creates a user and save him/her in the database
 * @param {string} id_user  - The id of the user
 * @param {string} name  - The name of the user
 * @param {string} surname - The surname of the user
 * @param {string} email - The email of the user
 * @param {string} photo  - The photo of the user
 * @param {integer} id_role - The id of the role of the user
 * @returns {JSON} - The status of user created
 */
async function createUser(id_user, name, surname, email, photo, id_role) {
  try {
    await User.create({
      id_user: id_user,
      name: name,
      surname: surname,
      email: email,
      photo: photo,
      id_role: id_role,
    });
    return { status: 201, message: 'User created!' };
  } catch (error) {
    return { status: 404, message: 'Error while creating user!', why: error.message };
  }
}

/**
 * Function to get all users or a specific user from the database
 * @param {string} id - The id of the user
 * @returns {JSON} - All users or a specific user
 */
async function getUserById(id = 'all') {
  try {
    const result = await User.findAll({
      attributes: ['id_user', 'name', 'surname', 'email', 'photo', 'id_role'],
      where: id !== 'all' ? { id_user: id } : null,
    });
    if (result.length === 0) {
      return { status: 404, message: 'No user found!' };
    }
    return { status: 200, message: id === 'all' ? 'All User' : `User with id ${id}`, result: result };
  } catch (error) {
    return { status: 404, message: 'Error while getting user(s)!', why: error.message };
  }
}

/**
 * Function to get all users or a specific user from the database
 * @param {string} email - The email of the user
 * @returns {JSON} - A specific user
 */
async function getUserByEmail(user_email) {
  try {
    const result = await User.findAll({
      attributes: ['id_user', 'name', 'surname', 'email', 'photo', 'id_role'],
      where: (email = user_email),
    });
    if (result.length === 0) {
      return { status: 404, message: 'No user found!' };
    }
    return { status: 200, message: `User with email ${user_email}`, result: result };
  } catch (error) {
    return { status: 404, message: 'Error while getting user!', why: error.message };
  }
}

async function getUserPermission(email) {
  const result = await User.findAll({
    raw: true,
    nest: true,
    attributes: ['email'],
    include: [
      {
        model: Role,
        include: [
          {
            model: Permission,
            attributes: ['pcreate', 'pread', 'pupdate', 'pdelete'],
          },
        ],
      },
    ],
    where: { email: email },
  });
  return result;
}

module.exports = {
  createUser: createUser,
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  getUserPermission: getUserPermission,
};
