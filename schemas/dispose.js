const { sequelize, Sequelize } = require('../lib/database');

const Dispose = sequelize.define('dispose', {
    id_dispose: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    id_permission: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
}, {
    timestamps: false,
    tableName: 'dispose'
});

module.exports = {
    Dispose: Dispose,
}