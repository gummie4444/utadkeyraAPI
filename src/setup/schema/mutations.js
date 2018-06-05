// Imports
import { GraphQLObjectType } from 'graphql';

// App Imports
import * as user from '../../modules/user/mutations';
import * as product from '../../modules/product/mutations';
import * as crate from '../../modules/crate/mutations';
import * as subscription from '../../modules/subscription/mutations';

import * as cities from '../../modules/cities/mutations';
import * as regions from '../../modules/regions/mutations';
import * as tripTypes from '../../modules/tripTypes/mutations';
import * as trips from '../../modules/trips/mutations';
import * as tripDetails from '../../modules/tripDetails/mutations';

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription,

    ...cities,
    ...regions,
    ...tripTypes,
    ...trips,
    ...tripDetails,
  },
});

export default mutation;
