// App Imports
import models from '../../setup/models';

// Get subscription by ID
export async function get(parentValue, { id }) {
  return models.Subscription.findOne({
    where: { id },
    include: [{ model: models.User, as: 'user' }, { model: models.Crate, as: 'crate' }],
  });
}

// Get subscription by user
export async function getByUser(parentValue, {}, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return models.Subscription.findAll({
      where: {
        userId: auth.user.id,
      },
      include: [{ model: models.User, as: 'user' }, { model: models.Crate, as: 'crate' }],
    });
  }
  throw new Error('Please login to view your subscriptions.');
}

// Get all subscriptions
export async function getAll() {
  return models.Subscription.findAll({
    include: [{ model: models.User, as: 'user' }, { model: models.Crate, as: 'crate' }],
  });
}

// Create subscription
export async function create(parentValue, { crateId }, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return models.Subscription.create({
      crateId,
      userId: auth.user.id,
    });
  }
  throw new Error('Please login to subscribe to this crate.');
}

// Delete subscription
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return models.Subscription.destroy({ where: { id, userId: auth.user.id } });
  }
  throw new Error('Access denied.');
}
