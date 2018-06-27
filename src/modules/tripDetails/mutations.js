// Imports
import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } from 'graphql';

// App Imports
import { TripDetailsType } from './types';
import { create, remove, update } from './resolvers';

// Region create
export const tripDetailsCreate = {
  type: TripDetailsType,
  args: {
    tripId: {
      name: 'tripId',
      type: GraphQLInt,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    notes: {
      name: 'notes',
      type: GraphQLString,
    },
    phone: {
      name: 'phone',
      type: GraphQLString,
    },
    mobile: {
      name: 'mobile',
      type: GraphQLString,
    },
    seats: {
      name: 'seats',
      type: GraphQLFloat,
    },
    smokeStatus: {
      name: 'smokeStatus',
      type: GraphQLBoolean,
    },
  },
  resolve: create,
};

// Crate update
export const tripDetailsUpdate = {
  type: TripDetailsType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    tripId: {
      name: 'tripId',
      type: GraphQLInt,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    notes: {
      name: 'notes',
      type: GraphQLString,
    },
    phone: {
      name: 'phone',
      type: GraphQLString,
    },
    mobile: {
      name: 'mobile',
      type: GraphQLString,
    },
    seats: {
      name: 'seats',
      type: GraphQLInt,
    },
    smokeStatus: {
      name: 'smokeStatus',
      type: GraphQLBoolean,
    },
  },
  resolve: update,
};

// Crate remove
export const tripDetailsRemove = {
  type: TripDetailsType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: remove,
};
