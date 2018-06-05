// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';

// App Imports
import { TripTypes } from './types';
import { getAll, getById } from './resolvers';

// Crates All
export const tripTypes = {
  type: new GraphQLList(TripTypes),
  args: {
    orderBy: { type: GraphQLString },
  },
  resolve: getAll,
};

// Crate By ID
export const tripTypeById = {
  type: TripTypes,
  args: {
    tripId: { type: GraphQLInt },
  },
  resolve: getById,
};
