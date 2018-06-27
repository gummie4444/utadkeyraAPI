// Imports
import {
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

// App Imports
import { TripType, TripInputType } from './types';
import { create, remove, update } from './resolvers';
import { TripDetailsType } from '../tripDetails/types';

const TripDetailsInputType = new GraphQLInputObjectType({
  name: 'tripDetailsInputType',
  description: 'Trip Details Type',
  fields: () => ({
    id: { type: GraphQLInt },
    tripId: { type: GraphQLInt },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    notes: { type: GraphQLString },
    phone: { type: GraphQLString },
    mobile: { type: GraphQLString },
    seats: { type: GraphQLInt },
    smokeStatus: { type: GraphQLBoolean },
  }),
});

// export const bulkTripCreate = {
//   type: TripInputType,
//   description: 'Test',
//   args: {
//     trips: new GraphQLList(TripInputType),
//   },
//   resolve: bulkCreate,
// };

// Region create
export const tripCreate = {
  type: TripType,
  args: {
    sId: {
      name: 'sId',
      type: GraphQLInt,
    },
    sUrl: {
      name: 'sUrl',
      type: GraphQLString,
    },
    date: {
      name: 'date',
      type: GraphQLDateTime,
    },
    time: {
      name: 'time',
      type: GraphQLDateTime,
    },
    to: {
      name: 'to',
      type: GraphQLInt,
    },
    from: {
      name: 'from',
      type: GraphQLInt,
    },
    type: {
      name: 'type',
      type: GraphQLInt,
    },
    tripDetails: {
      name: 'tripDetails',
      type: TripDetailsInputType,
    },
  },
  resolve: create,
};

// Crate update
export const tripUpdate = {
  type: TripType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    sId: {
      name: 'sId',
      type: GraphQLInt,
    },
    sUrl: {
      name: 'sUrl',
      type: GraphQLString,
    },
    date: {
      name: 'date',
      type: GraphQLDateTime,
    },
    time: {
      name: 'time',
      type: GraphQLDateTime,
    },
    to: {
      name: 'to',
      type: GraphQLInt,
    },
    from: {
      name: 'from',
      type: GraphQLInt,
    },
    type: {
      name: 'type',
      type: GraphQLInt,
    },
  },
  resolve: update,
};

// Crate remove
export const tripRemove = {
  type: TripType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: remove,
};
