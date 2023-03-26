const { sequelize, Sequelize } = require('./app');

const Invoice = sequelize.define('invoice', {
    id_invoice: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    typology: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_user: {
        type: Sequelize.STRING,
        externalKey: true,
        allowNull: false
    },
    id_customer: {
        type: Sequelize.INTEGER,
        externalKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'invoice',
});

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
    }
}, {
    timestamps: false,
    tableName: 'user',
}
)

module.exports = {
    Invoice: Invoice,
    User: User,
}