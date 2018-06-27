module.exports = function (sequelize, DataTypes) {
  const Regions = sequelize.define('regions', {
    name: {
      type: DataTypes.STRING,
    },
  });

  return Regions;
};
