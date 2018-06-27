import moment from 'moment';

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

// Get all trips, only return those from today to the future TODO: make nicer
export async function getAll(parentValue, { orderBy = 'asc', from, to }) {
  return models.Trips.findAll({
    order: [['id', orderBy]],
    where: {
      time: {
        $gt:
          from ||
          moment()
            .startOf('day')
            .toDate(),
        $lt:
          to ||
          moment()
            .endOf('day')
            .add(1, 'years')
            .toDate(),
      },
    },
    include: [
      { model: models.Cities, as: 'fromCity' },
      { model: models.Cities, as: 'toCity' },
      { model: models.TripTypes, as: 'tripType' },
      { model: models.TripDetails, as: 'tripDetails' },
    ],
  });
}
// bulk create

export async function bulkCreate(parentValue, { trips }, { auth }) {
  console.log(trips);
  const test = await models.Trips.bulkCreate(trips);
  if (!test) {
    throw new Error('The trip you are looking for does not exists or has been discontinued.');
  }
  console.log(test);

  return test;
}

// Create region
export async function create(
  parentValue,
  {
    sId, sUrl, date, time, to, from, type, tripDetails,
  },
  { auth },
) {
  if (true) {
    console.log('tripDe', tripDetails);
    const trip = await models.Trips.create({
      sId,
      sUrl,
      date,
      time,
      to,
      from,
      type,
    });
    if (!trip) {
      // trip does not exists
      throw new Error('The trip you are looking for does not exists or has been discontinued.');
    } else {
      const test = await models.TripDetails.create({
        tripId: trip.id,
        ...tripDetails,
      });

      if (test) {
        trip.tripDetails = test;
        return trip;
      }
      throw new Error(' Wrongness');
    }
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
