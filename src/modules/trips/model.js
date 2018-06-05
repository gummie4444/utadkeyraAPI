module.exports = function (sequelize, DataTypes) {
  const Trip = sequelize.define('trips', {
    sId: {
      type: DataTypes.INTEGER,
    },
    sUrl: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.DATE,
    },
    to: {
      type: DataTypes.INTEGER,
    },
    from: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.INTEGER,
    },
  });

  Trip.associate = function (models) {
    Trip.belongsTo(models.Cities, { foreignKey: 'from', as: 'fromCity' });
    Trip.belongsTo(models.Cities, { foreignKey: 'to', as: 'toCity' });
    Trip.belongsTo(models.TripTypes, { foreignKey: 'type', as: 'tripType' });
    Trip.belongsTo(models.TripDetails, { foreignKey: 'id', as: 'tripDetails' });
  };

  return Trip;
};
