import moment from 'moment';

// App Imports
import models from '../../setup/models';
import params from '../../config/params.json';
import { getCityById } from '../cities/resolvers';
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

export async function getAllSkip(parentValue, {
  to, from, date, skip = 1, amount = 10,
}) {
  console.log(to, from, date, skip, amount, 'test');

  const whereObject = {};

  if (from) {
    whereObject.from = {
      $eq: from,
    };
  }

  if (to) {
    whereObject.to = {
      $eq: to,
    };
  }

  if (date) {
    whereObject.date = {
      $eq: date,
    };
  }

  whereObject.time = {
    $gt: moment()
      .startOf('day')
      .toDate(),
    $lt: moment()
      .endOf('day')
      .add(1, 'years')
      .toDate(),
  };

  console.log(whereObject, 'where object ------');
  const results = await models.Trips.findAndCountAll({
    offset: skip,
    limit: amount,
    where: whereObject,
    order: [['time', 'asc'], ['id', 'desc']],
    // where: {

    // },
    include: [
      { model: models.Cities, as: 'fromCity' },
      { model: models.Cities, as: 'toCity' },
      { model: models.TripTypes, as: 'tripType' },
      { model: models.TripDetails, as: 'tripDetails' },
    ],
  });
  const final = { count: results.count, trips: results.rows };

  return final;
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
    sId, sUrl, date, time, to, toNew, from, fromNew, type, tripDetails,
  },
  { auth },
) {
  // Create a new to destination
  let newFromCity;
  let newToCity;
  if (!to && toNew) {
    newToCity = await models.Cities.create({
      sId: null,
      name: toNew,
      regionId: 1, // lets just put 1 as default
    });
  }
  if (!from && fromNew) {
    newFromCity = await models.Cities.create({
      sId: null,
      name: fromNew,
      regionId: 1,
    });
  }
  if (true) {
    let newTime;
    if (time == null || time == 'ANY') {
      newTime = moment(date).format('YYYY-MM-DD 23:59:59');
    }

    const trip = await models.Trips.create({
      sId,
      sUrl,
      date,
      time: newTime || time,
      to: newToCity ? newToCity.id : to,
      from: newFromCity ? newFromCity.id : from,
      type,
    });
    if (!trip) {
      // trip does not exists
      throw new Error('Something went wrong try again');
    } else {
      const test = await models.TripDetails.create({
        tripId: trip.id,
        ...tripDetails,
      });

      if (test) {
        const toCity = getCityById(null, { cityId: trip.newToCity ? newToCity.id : to });
        const fromCity = getCityById(null, { cityId: trip.newFromCity ? newFromCity.id : from });

        trip.tripDetails = test;
        trip.toCity = toCity;
        trip.fromCity = fromCity;
        return trip;
      }
      throw new Error(' Something went');
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
