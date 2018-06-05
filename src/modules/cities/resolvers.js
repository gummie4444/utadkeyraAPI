// App Imports
import models from '../../setup/models';
import params from '../../config/params.json';

// REMEMBER async function is always wrapped in a promise
// Get City by ID
export async function getById(parentValue, { cityId }) {
  const city = await models.Cities.findOne({
    where: { id: cityId },
    include: [{ model: models.Regions, as: 'region' }],
  });
  if (!city) {
    // City does not exists
    throw new Error('The city you are looking for does not exists or has been discontinued.');
  } else {
    return city;
  }
}

// Get all cities
export async function getAll(parentValue, { orderBy = 'asc' }) {
  return models.Cities.findAll({
    order: [['id', orderBy]],
    include: [{ model: models.Regions, as: 'region' }],
  });
}

// Create city
export async function create(parentValue, { sId, name, regionId }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Cities.create({
      sId,
      name,
      regionId,
    });
  }
  throw new Error('Operation denied.');
}

// Update City
export async function update(parentValue, {
  id, sId, name, regionId,
}, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Cities.update(
      {
        sId,
        name,
        regionId,
      },
      { where: { id } },
    );
  }
  throw new Error('Operation denied.');
}

// Delete City
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Cities.destroy({ where: { id } });
  }
  throw new Error('Operation denied.');
}
