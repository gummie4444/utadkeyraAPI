module.exports = function (sequelize, DataTypes) {
  const TripDetails = sequelize.define('tripDetails', {
    tripId: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    seats: {
      type: DataTypes.INTEGER,
    },
    smokeStatus: {
      type: DataTypes.BOOLEAN,
    },
  });

  TripDetails.associate = function (models) {};

  return TripDetails;
};
