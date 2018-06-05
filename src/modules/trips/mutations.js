// Imports
import { GraphQLString, GraphQLInt } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

// App Imports
import { TripType } from './types';
import { create, remove, update } from './resolvers';

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
