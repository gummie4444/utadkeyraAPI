module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('regions', [
      {
        name: 'Suðurland',
      },
      {
        name: 'Vesturland',
      },
      {
        name: 'Norðurland',
      },
      {
        name: 'Austurland',
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('regions', null, {}),
};
