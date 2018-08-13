// Imports
import graphqlHTTP from 'express-graphql';

// App Imports
import config from '../config/config.json';
import authentication from './authentication';
import schema from './schema';
import env from '../config/env';

// Setup GraphQL
export default function (server) {
  console.info('SETUP - GraphQL...');

  server.use(authentication);

  // API (GraphQL on route `/`)
  server.use(
    config.graphql.endpoint,
    graphqlHTTP(request => ({
      schema,
      graphiql: env === 'development',
      pretty: config.graphql.pretty,
      context: {
        auth: {
          user: request.user,
          isAuthenticated: request.user && request.user.id > 0,
        },
      },
    })),
  );
}
