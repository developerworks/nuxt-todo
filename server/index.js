import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import schema from './data/schema';
import connectMysql from './data/connectors/mysql-connector';
import {authenticate} from './utils/authentication';
import buildDataloaders from './data/dataloaders';
import path from 'path';
import dotenv from 'dotenv';
dotenv.load({
  path: path.resolve('./server/.env')
});

const start = async () => {
  const mysql = await connectMysql();
  const app = express();
  app.set('port', process.env.PORT);

  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mysql.Users);
    return {
      context: {mysql, user, dataloaders: buildDataloaders(mysql)},
      schema
    };
  };

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
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
  app.listen(process.env.PORT, process.env.HOST);
  console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`); // eslint-disable-line no-console
};

start();
