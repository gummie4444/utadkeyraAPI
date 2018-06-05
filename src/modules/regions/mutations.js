// Imports
import { GraphQLString, GraphQLInt } from 'graphql';

// App Imports
import { RegionType } from './types';
import { create, remove, update } from './resolvers';

// Region create
export const regionCreate = {
  type: RegionType,
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
  type: RegionType,
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
  type: RegionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: remove,
};
