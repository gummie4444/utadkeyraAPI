// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';

// City type
const TripDetailsType = new GraphQLObjectType({
  name: 'tripDetails',
  description: 'Trip Details Type',

  fields: () => ({
    id: { type: GraphQLInt },
    tripId: { type: GraphQLInt },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    notes: { type: GraphQLString },
    phone: { type: GraphQLInt },
    mobile: { type: GraphQLInt },
    seats: { type: GraphQLInt },
    smokeStatus: { type: GraphQLBoolean },
  }),
});

export { TripDetailsType };
