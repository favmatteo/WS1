const { sequelize, Sequelize } = require('../lib/database');

const Permission = sequelize.define('permission', {
    id_permission: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    pcreate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    pread: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    pupdate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    pdelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'permission',
});

module.exports = {
    Permission: Permission,
}