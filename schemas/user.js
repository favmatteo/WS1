const { sequelize, Sequelize } = require('../lib/database');

const User = sequelize.define('user', {
    id_user: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
    }
}, {
    timestamps: false,
    tableName: 'user',
}
)

module.exports = {
    User: User,
}