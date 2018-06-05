module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('trips', [
      {
        sId: 1,
        sUrl: 'www.google.com',
        date: new Date(),
        time: new Date(),
        to: 1,
        from: 2,
        type: 1,
      },
      {
        sId: 2,
        sUrl: 'www.google.com',
        date: new Date(),
        time: new Date(),
        to: 2,
        from: 1,
        type: 2,
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('trips', null, {}),
};
