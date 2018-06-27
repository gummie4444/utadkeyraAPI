// Imports
import express from 'express';

// App Imports
import setupLoadModules from './setup/loadModules';
import setupGraphQL from './setup/graphql';
import setupUpload from './setup/upload';
import setupStartServer from './setup/startServer';

import initScraper from './setup/scraper';

// Create express server
const server = express();

// Setup load modules
setupLoadModules(server);

// Setup uploads
setupUpload(server);

// Setup GraphQL
setupGraphQL(server);

// Start server
setupStartServer(server);

// Init scraper
initScraper({});
