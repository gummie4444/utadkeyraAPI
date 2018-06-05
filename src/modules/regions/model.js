module.exports = function (sequelize, DataTypes) {
  const Regions = sequelize.define('regions', {
    name: {
      type: DataTypes.STRING,
    },
  });

  // Regions.associate = function (models) {
  //   Regions.hasMany(models.City, { foreignKey: 'regionId', sourceKey: 'id' });
  // };
  return Regions;
};
