const { sequelize } = require('../database');

/**
 * @description This function is used to connect to the database.
 */
function useDatabase() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connected!');
    })
    .catch((error) => {
      console.log(`Error while connecting with database! ${error.message}`);
      process.exit();
    });
}

module.exports = {
  useDatabase: useDatabase,
};
