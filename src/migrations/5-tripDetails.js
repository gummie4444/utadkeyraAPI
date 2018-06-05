module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tripDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tripId: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'trips',
          // This is the column name of the referenced model
          key: 'id',
        },
      },
      email: {
        type: Sequelize.TEXT,
      },
      mobile: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      seats: {
        type: Sequelize.INTEGER,
      },
      smokeStatus: {
        type: Sequelize.BOOLEAN,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('tripDetails'),
};
