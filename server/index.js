import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import config from './config';
import schema from './data/schema';
import connectMysql from './data/connectors/mysql-connector';

const start = async () => {
  const mysql = await connectMysql();
  const app = express();
  app.set('port', config.PORT);

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: {mysql},
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  let nuxtConfig = require('../nuxt.config.js');
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production');
  const nuxt = new Nuxt(nuxtConfig);
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    builder.build();
  }
  app.use(nuxt.render);
  app.listen(config.PORT, config.HOST);
  console.log(`Server listening on ${config.HOST}:${config.PORT}`); // eslint-disable-line no-console
};

start();
