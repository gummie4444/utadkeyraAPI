module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tripTypes', {
    name: {
      type: DataTypes.STRING,
    },
  });
};
