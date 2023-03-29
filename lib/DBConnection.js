const { sequelize } = require('./app');

/**
 * @description This function checks if the database is connected.
 */
function isDBConnected() {
    sequelize.authenticate().then(() => {
        console.log("Connected!");
    }).catch((error) => {
        console.log(`Error while connecting with database! ${error.message}`);
        process.exit();
    });
}

module.exports = {
    isDBConnected: isDBConnected,
}
