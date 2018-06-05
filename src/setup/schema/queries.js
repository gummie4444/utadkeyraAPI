// Imports
import { GraphQLObjectType } from 'graphql';

// App Imports
import * as user from '../../modules/user/query';
import * as product from '../../modules/product/query';
import * as crate from '../../modules/crate/query';
import * as subscription from '../../modules/subscription/query';

import * as cities from '../../modules/cities/query';
import * as regions from '../../modules/regions/query';
import * as tripTypes from '../../modules/tripTypes/query';
import * as trips from '../../modules/trips/query';

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...product,
    ...crate,
    ...subscription,

    ...cities,
    ...regions,
    ...tripTypes,
    ...trips,
  }),
});

export default query;
