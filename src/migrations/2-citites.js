module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      regionId: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'regions',
          // This is the column name of the referenced model
          key: 'id',
        },
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('cities'),
};
