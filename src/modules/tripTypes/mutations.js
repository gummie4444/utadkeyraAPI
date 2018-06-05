// Imports
import { GraphQLString, GraphQLInt } from 'graphql';

// App Imports
import { TripTypes } from './types';
import { create, remove, update } from './resolvers';

// Region create
export const regionCreate = {
  type: TripTypes,
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
    },
  },
  resolve: create,
};

// Crate update
export const regionUpdate = {
  type: TripTypes,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
  },
  resolve: update,
};

// Crate remove
export const regionRemove = {
  type: TripTypes,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: remove,
};
