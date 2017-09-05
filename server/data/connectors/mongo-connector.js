import mongoose from 'mongoose';
import config from '../../config';

mongoose.Promise = global.Promise;
export default async () => {
  mongoose.connect(config.DB_ADDRESS);
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Database connected');
  });
  return {Todos: db.collection('todos'), Users: db.collection('users')};
};
