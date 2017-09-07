import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import config from './config';
import schema from './data/schema';
import connectMysql from './data/connectors/mysql-connector';
import {authenticate} from './authentication';

const start = async () => {
  const mysql = await connectMysql();
  const app = express();
  app.set('port', config.PORT);

  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mysql.Users);
    return {
      context: {mysql, user},
      schema
    };
  };

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `'authorization': 'bearer token-fojtik.v@gmail.com'`
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
