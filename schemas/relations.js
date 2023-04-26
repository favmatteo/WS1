const { Customer } = require('./customer');
const { Invoice } = require('./invoice');
const { Permission } = require('./permission');
const { Role } = require('./role');
const { User } = require('./user');
const { Dispose } = require('./dispose');

Role.hasMany(User, { foreignKey: 'id_role' });
User.belongsTo(Role, { foreignKey: 'id_role' });

Role.belongsToMany(Permission, { through: Dispose, foreignKey: 'id_role' });
Permission.belongsToMany(Role, { through: Dispose, foreignKey: 'id_permission' });
