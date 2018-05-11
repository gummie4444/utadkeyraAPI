// User
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.TEXT,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Subscription);
  };

  return User;
};
