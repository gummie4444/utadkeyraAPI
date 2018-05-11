// Subscription
module.exports = function (sequelize, DataTypes) {
  const Subscription = sequelize.define('subscriptions', {
    userId: {
      type: DataTypes.INTEGER,
    },
    crateId: {
      type: DataTypes.INTEGER,
    },
  });

  Subscription.associate = function (models) {
    Subscription.belongsTo(models.User);
    Subscription.belongsTo(models.Crate);
  };

  return Subscription;
};
