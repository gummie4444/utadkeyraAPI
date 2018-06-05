// App Imports
import models from '../../setup/models';
import params from '../../config/params.json';

// REMEMBER async function is always wrapped in a promise
// Get trip by ID
export async function getById(parentValue, { tripId }) {
  const trip = await models.Trips.findOne({
    where: { id: tripId },
    include: [
      { model: models.Cities, as: 'fromCity' },
      { model: models.Cities, as: 'toCity' },
      { model: models.TripTypes, as: 'tripType' },
      { model: models.TripDetails, as: 'tripDetails' },
    ],
  });
  if (!trip) {
    // trip does not exists
    throw new Error('The trip you are looking for does not exists or has been discontinued.');
  } else {
    return trip;
  }
}

// Get all trips
export async function getAll(parentValue, { orderBy = 'asc' }) {
  return models.Trips.findAll({
    order: [['id', orderBy]],
    include: [
      { model: models.Cities, as: 'fromCity' },
      { model: models.Cities, as: 'toCity' },
      { model: models.TripTypes, as: 'tripType' },
      { model: models.TripDetails, as: 'tripDetails' },
    ],
  });
}

// Create region
export async function create(parentValue, {
  sId, sUrl, date, time, to, from, type,
}, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Trips.create({
      sId,
      sUrl,
      date,
      time,
      to,
      from,
      type,
    });
  }
  throw new Error('Operation denied.');
}

// Update trip
export async function update(parentValue, {
  id, sId, sUrl, date, time, to, from, type,
}, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Trips.update(
      {
        sId,
        sUrl,
        date,
        time,
        to,
        from,
        type,
      },
      { where: { id } },
    );
  }
  throw new Error('Operation denied.');
}

// Delete Trip
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return models.Trips.destroy({ where: { id } });
  }
  throw new Error('Operation denied.');
}
