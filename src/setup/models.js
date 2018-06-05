// Imports
import Sequelize from 'sequelize';

// App Imports
import databaseConnection from './databaseConnection';

const models = {
  User: databaseConnection.import('../modules/user/model'),
  Product: databaseConnection.import('../modules/product/model'),
  Crate: databaseConnection.import('../modules/crate/model'),
  Subscription: databaseConnection.import('../modules/subscription/model'),
  Cities: databaseConnection.import('../modules/cities/model'),
  Regions: databaseConnection.import('../modules/regions/model'),
  TripTypes: databaseConnection.import('../modules/tripTypes/model'),
  Trips: databaseConnection.import('../modules/trips/model'),
  TripDetails: databaseConnection.import('../modules/tripDetails/model'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
