module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tripTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('tripTypes'),
};
