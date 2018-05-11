const bcrypt = require('bcrypt');
const config = require('../config/config.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'The User',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
