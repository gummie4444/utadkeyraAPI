module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define('cities', {
    name: {
      type: DataTypes.STRING,
    },
    sId: {
      type: DataTypes.INTEGER,
    },
    regionId: {
      type: DataTypes.INTEGER,
    },
  });

  City.associate = function (models) {
    City.belongsTo(models.Regions, { foreignKey: 'id' });
  };
  return City;
};
