// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

// App Imports
import { TripType, TripSkipType } from './types';
import { getAll, getById, getAllSkip } from './resolvers';

// Crates All
export const trips = {
  type: new GraphQLList(TripType),
  args: {
    orderBy: { type: GraphQLString },
    from: { type: GraphQLDateTime },
    to: { type: GraphQLDateTime },
  },
  resolve: getAll,
};

export const tripsSkip = {
  type: TripSkipType,
  args: {
    from: { type: GraphQLInt },
    to: { type: GraphQLInt },
    date: { type: GraphQLDateTime },
    skip: { type: GraphQLInt },
    amount: { type: GraphQLInt },
  },
  resolve: getAllSkip,
};

// Crate By ID
export const tripById = {
  type: TripType,
  args: {
    tripId: { type: GraphQLInt },
  },
  resolve: getById,
};
