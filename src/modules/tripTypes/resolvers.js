// App Imports
import models from '../../setup/models';
import params from '../../config/params.json';

// REMEMBER async function is always wrapped in a promise
// Get Region by ID
export async function getById(parentValue, { tripTypeId }) {
  const tripType = await models.TripTypes.findOne({ where: { id: tripTypeId } });
  if (!tripType) {
    // region does not exists
    throw new Error('The region you are looking for does not exists or has been discontinued.');
  } else {
    return tripType;
  }
}

// Get all tripType
export async function getAll(parentValue, { orderBy = 'asc' }) {
  return models.TripTypes.findAll({ order: [['id', orderBy]] });
}

// Create TripType
export async function create(parentValue, { name }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.TripTypes.create({
      name,
    });
  }
  throw new Error('Operation denied.');
}

// Update TripType
export async function update(parentValue, { id, name }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.TripTypes.update(
      {
        name,
      },
      { where: { id } },
    );
  }
  throw new Error('Operation denied.');
}

// Delete TripType
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.TripTypes.destroy({ where: { id } });
  }
  throw new Error('Operation denied.');
}
