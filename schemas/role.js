const { sequelize, Sequelize } = require('../lib/database');

const Role = sequelize.define(
  'role',
  {
    id_role: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'roles',
  }
);

module.exports = {
  Role: Role,
};
