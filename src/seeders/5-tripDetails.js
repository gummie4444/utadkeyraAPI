module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('tripDetails', [
      {
        tripId: 1,
        email: 'geb@gmail.com',
        mobile: 7728426,
        name: 'Guðmundur Egill',
        notes: 'Need some dudes for my trips',
        seats: 3,
        smokeStatus: true,
      },
      {
        tripId: 2,
        email: 'stef@gmail.com',
        mobile: 7728426,
        name: 'Stefanía Egill',
        notes: 'LADIES some dudes for my trips',
        seats: 1,
        smokeStatus: false,
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('tripDetails', null, {}),
};
