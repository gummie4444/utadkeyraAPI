module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('cities', [
      {
        sId: 1,
        name: 'Test Borg 1',
        regionId: 1,
      },
      {
        sId: 2,
        name: 'Test Borg 2',
        regionId: 1,
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('cities', null, {}),
};
