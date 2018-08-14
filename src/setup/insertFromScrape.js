import { graphql } from 'graphql';
import moment from 'moment';
import schema from '../setup/schema/index';

const citiesQuery = `
{
  cities { 
    id
    name
    region{
      name
    }
  }
}`;

const tripsQuery = `
{
  trips { 
    id
    sId
  }
}`;

const createTripMutation = `
    mutation CreateTrip(
    $sId: Int,
    $sUrl: String,
    $date: DateTime,
    $time: DateTime,
    $to: Int,
    $from: Int,
    $type: Int,
    $tripDetails: tripDetailsInputType,
    ) {
    tripCreate(
        sId: $sId,
        sUrl: $sUrl,
        date: $date,
        time: $time,
        to: $to,
        from: $from,
        type: $type,
        tripDetails: $tripDetails
    ) {
        id
        sId
        tripDetails {
        id
        email
        }
    }
    }
`;

async function getCities() {
  const cities = graphql(schema, citiesQuery).then(result => result.data.cities);
  return cities;
}

async function getOldTrips() {
  const oldTrips = graphql(schema, tripsQuery).then(result => result.data.trips);
  return oldTrips;
}

const getLocation = (to, cities) => {
  const city = cities.filter(c => c.name === to);
  return city.length > 0 ? city[0].id : -1;
};

const cleanTrips = (trips, oldTrips, cities) => {
  const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  console.log(trips.length, 'Length before filtering');
  console.log(oldTrips.length, 'oldTrips');
  // Start by removing all the rides with invalid times
  // Then we remove all the future rides
  // Then we remove already inserted rides
  // And rides that have weird seats
  const filteredTrips = trips.filter(ride =>
    !(ride.from !== -1 || ride.to !== -1) &&
      timeRegex.test(ride.time) &&
      !oldTrips.some(oldTrip => parseInt(oldTrip.sId) === parseInt(ride.id)) &&
      !isNaN(ride.details.seats) &&
      moment(ride.date, 'DD.MM.YYYY').startOf('day') <
        moment()
          .endOf('day')
          .add(1, 'years')
          .toDate());
  console.log(filteredTrips.length, 'Length after filtering');
  return filteredTrips.map(trip => ({
    sId: trip.id,
    sUrl: trip.detailUrl,
    date: moment(trip.date, 'DD.MM.YYYY').format('YYYY-MM-DDThh:mm:ssZ'), // format as '2007-12-03T10:15:30Z'
    time: moment(`${trip.date} ${trip.time}`, 'DD.MM.YYYY HH:mm').format('YYYY-MM-DDThh:mm:ssZ'),
    to: getLocation(trip.to, cities),
    from: getLocation(trip.from, cities),
    type: trip.type === 'Ride' ? 1 : 2,
    tripDetails: {
      email: trip.details.email,
      mobile: trip.details.mobile.replace(/\D/g, ''),
      phone: trip.details.phone.replace(/\D/g, ''),
      name: trip.details.name,
      seats: trip.details.seats,
      notes: trip.details.notes,
      smokeStatus: trip.details.smokeStatus === 'yes' ? 1 : 0,
    },
  }));
};

const insertTripsIntoDb = async (trips) => {
  console.log('Starting inserting into DB');
  const cities = await getCities();

  const oldTrips = await getOldTrips();
  const finalTrips = cleanTrips(trips, oldTrips, cities);
  console.log(finalTrips[0] || 0, 'New Items to be inserted');

  // TODO: add some handler if there is a error
  const allPromises = finalTrips.map(ride =>
    graphql(schema, createTripMutation, null, {}, ride).then(result => result));

  Promise.all(allPromises).then((results) => {
    console.log(results.length, 'Result for all');
    console.log('--------------');
  });
};

export default insertTripsIntoDb;
