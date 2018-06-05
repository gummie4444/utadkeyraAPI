// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

// City type
const RegionType = new GraphQLObjectType({
  name: 'region',
  description: 'Region Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

export { RegionType };
