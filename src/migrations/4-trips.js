module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('trips', {
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
      sUrl: {
        type: Sequelize.TEXT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      time: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      to: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'cities',
          // This is the column name of the referenced model
          key: 'id',
        },
      },
      from: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'cities',
          // This is the column name of the referenced model
          key: 'id',
        },
      },
      type: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'tripTypes',
          // This is the column name of the referenced model
          key: 'id',
        },
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('trips'),
};
