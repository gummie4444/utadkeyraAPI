// Imports
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';
import { CityType } from '../cities/types';
import { TripTypes } from '../tripTypes/types';
import { TripDetailsType } from '../tripDetails/types';

// City type
const TripType = new GraphQLObjectType({
  name: 'trip',
  description: 'Trip Type',
  fields: () => ({
    id: { type: GraphQLInt },
    sId: { type: GraphQLString },
    sUrl: { type: GraphQLString },
    date: { type: GraphQLDateTime },
    time: { type: GraphQLDateTime },
    to: { type: GraphQLInt },
    from: { type: GraphQLInt },
    type: { type: GraphQLInt },
    fromCity: { type: CityType },
    toCity: { type: CityType },
    tripType: { type: TripTypes },
    tripDetails: { type: TripDetailsType },
  }),
});

const TripSkipType = new GraphQLObjectType({
  name: 'tripSkip',
  description: 'Meta data for client',
  fields: () => ({
    trips: { type: new GraphQLList(TripType) },
    count: { type: GraphQLInt },
  }),
});

const TripInputType = new GraphQLInputObjectType({
  name: 'trip',
  description: 'Trip Type',

  fields: () => ({
    id: { type: GraphQLInt },
    sId: { type: GraphQLString },
    sUrl: { type: GraphQLString },
    date: { type: GraphQLDateTime },
    time: { type: GraphQLDateTime },
    to: { type: GraphQLInt },
    from: { type: GraphQLInt },
    type: { type: GraphQLInt },
    fromCity: { type: CityType },
    toCity: { type: CityType },
    tripType: { type: TripTypes },
    tripDetails: { type: TripDetailsType },
  }),
});

const BulkTripType = new GraphQLObjectType({
  name: 'bulkTrips',
  description: 'Bulk Trip Type',
  fields: () => ({
    trips: { type: [TripInputType] },
  }),
});

export { TripType, BulkTripType, TripSkipType };
