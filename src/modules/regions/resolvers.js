// App Imports
import models from '../../setup/models';
import params from '../../config/params.json';

// REMEMBER async function is always wrapped in a promise
// Get Region by ID
export async function getById(parentValue, { regionId }) {
  const region = await models.Regions.findOne({ where: { id: regionId } });
  if (!region) {
    // region does not exists
    throw new Error('The region you are looking for does not exists or has been discontinued.');
  } else {
    return region;
  }
}

// Get all regions
export async function getAll(parentValue, { orderBy = 'asc' }) {
  return models.Regions.findAll({ order: [['id', orderBy]] });
}

// Create region
export async function create(parentValue, { name }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Regions.create({
      name,
    });
  }
  throw new Error('Operation denied.');
}

// Update region
export async function update(parentValue, { id, name }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Regions.update(
      {
        name,
      },
      { where: { id } },
    );
  }
  throw new Error('Operation denied.');
}

// Delete Region
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Regions.destroy({ where: { id } });
  }
  throw new Error('Operation denied.');
}
