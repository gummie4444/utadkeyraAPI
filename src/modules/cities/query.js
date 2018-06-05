// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';

// App Imports
import { CityType } from './types';
import { getAll, getById } from './resolvers';

// Crates All
export const cities = {
  type: new GraphQLList(CityType),
  args: {
    orderBy: { type: GraphQLString },
  },
  resolve: getAll,
};

// Crate By ID
export const cityById = {
  type: CityType,
  args: {
    cityId: { type: GraphQLInt },
  },
  resolve: getById,
};
