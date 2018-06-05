// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { RegionType } from '../regions/types';
// City type
const CityType = new GraphQLObjectType({
  name: 'city',
  description: 'City Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    sId: { type: GraphQLInt },
    region: { type: RegionType },
  }),
});

export { CityType };
