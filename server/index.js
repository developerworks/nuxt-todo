import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';
import config from './config';
import schema from './data/schema';
import connectMongo from './data/connectors/mongo-connector';

const start = async () => {
  const mongo = await connectMongo();
  const app = express();
  app.set('port', config.PORT);

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: {mongo},
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  // Import and Set Nuxt.js options
  let nuxtConfig = require('../nuxt.config.js');
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production');

  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig);

  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(config.PORT, config.HOST);
  console.log(`Server listening on ${config.HOST}:${config.PORT}`); // eslint-disable-line no-console
};

start();
