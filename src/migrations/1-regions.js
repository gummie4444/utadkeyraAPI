module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('regions', {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('regions'),
};
