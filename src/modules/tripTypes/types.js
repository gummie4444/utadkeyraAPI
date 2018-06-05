// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

// City type
const TripTypes = new GraphQLObjectType({
  name: 'tripTypes',
  description: 'Trip Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

export { TripTypes };
