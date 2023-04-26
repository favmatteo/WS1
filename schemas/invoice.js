const { sequelize, Sequelize } = require('../lib/database');

const Invoice = sequelize.define(
  'invoice',
  {
    id_invoice: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    typology: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_user: {
      type: Sequelize.STRING,
      foreignKey: true,
      allowNull: false,
    },
    id_customer: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'invoice',
  }
);

module.exports = {
  Invoice: Invoice,
};
