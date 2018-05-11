// App Imports
import models from '../../setup/models';
import params from '../../config/params.json';

// REMEMBER async function is always wrapped in a promise
// Get crate by ID
export async function getById(parentValue, { crateId }) {
  const crate = await models.Crate.findOne({ where: { id: crateId } });

  if (!crate) {
    // Crate does not exists
    throw new Error('The crate you are looking for does not exists or has been discontinued.');
  } else {
    return crate;
  }
}

// Get all crates
export async function getAll(parentValue, { orderBy }) {
  return models.Crate.findAll({ order: [['id', orderBy]] });
}

// Create crate
export async function create(parentValue, { name, description }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Crate.create({
      name,
      description,
    });
  }
  throw new Error('Operation denied.');
}

// Update crate
export async function update(parentValue, { id, name, description }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Crate.update(
      {
        name,
        description,
      },
      { where: { id } },
    );
  }
  throw new Error('Operation denied.');
}

// Delete crate
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Crate.destroy({ where: { id } });
  }
  throw new Error('Operation denied.');
}
