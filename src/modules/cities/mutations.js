// Imports
import { GraphQLString, GraphQLInt } from 'graphql';

// App Imports
import { CityType } from './types';
import { create, remove, update } from './resolvers';

// Crate create
export const cityCreate = {
  type: CityType,
  args: {
    sId: {
      name: 'sId',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    regionId: {
      name: 'regionId',
      type: GraphQLInt,
    },
  },
  resolve: create,
};

// Crate update
export const cityUpdate = {
  type: CityType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    sId: {
      name: 'sId',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    regionId: {
      name: 'regionId',
      type: GraphQLInt,
    },
  },
  resolve: update,
};

// Crate remove
export const cityRemove = {
  type: CityType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: remove,
};
