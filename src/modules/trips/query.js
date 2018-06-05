// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';

// App Imports
import { TripType } from './types';
import { getAll, getById } from './resolvers';

// Crates All
export const trips = {
  type: new GraphQLList(TripType),
  args: {
    orderBy: { type: GraphQLString },
  },
  resolve: getAll,
};

// Crate By ID
export const tripById = {
  type: TripType,
  args: {
    tripId: { type: GraphQLInt },
  },
  resolve: getById,
};
