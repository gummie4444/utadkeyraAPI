module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('tripTypes', [
      {
        name: 'Ride',
      },
      {
        name: 'Passenger',
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('tripTypes', null, {}),
};
