// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';
import { CityType } from '../cities/types';
import { TripTypes } from '../tripTypes/types';
import { TripDetailsType } from '../tripDetails/types';

// City type
const TripType = new GraphQLObjectType({
  name: 'trip',
  description: 'Trip Type',

  fields: () => ({
    id: { type: GraphQLInt },
    sId: { type: GraphQLString },
    sUrl: { type: GraphQLString },
    date: { type: GraphQLDateTime },
    time: { type: GraphQLDateTime },
    to: { type: GraphQLInt },
    from: { type: GraphQLInt },
    type: { type: GraphQLInt },
    fromCity: { type: CityType },
    toCity: { type: CityType },
    tripType: { type: TripTypes },
    tripDetails: { type: TripDetailsType },
  }),
});

export { TripType };
