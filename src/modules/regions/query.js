// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';

// App Imports
import { RegionType } from './types';
import { getAll, getById } from './resolvers';

// Crates All
export const regions = {
  type: new GraphQLList(RegionType),
  args: {
    orderBy: { type: GraphQLString },
  },
  resolve: getAll,
};

// Crate By ID
export const regionById = {
  type: RegionType,
  args: {
    regionId: { type: GraphQLInt },
  },
  resolve: getById,
};
