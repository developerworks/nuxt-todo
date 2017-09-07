import Sequelize from 'sequelize';
import path from 'path';
import config from '../../config';
import casual from 'casual';
import _ from 'lodash';

export default async () => {
  const db = await new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  const userModel = db.import(path.resolve('./server/data/models/userModel.js'));
  const todoModel = db.import(path.resolve('./server/data/models/todoModel.js'));

  userModel.hasMany(todoModel);
  todoModel.belongsTo(userModel);

  db.sync({ force: true }).then(() => {
    _.times(10, () => {
      return userModel.create({
        name: `${casual.first_name} ${casual.last_name}`,
        email: casual.email,
        password: 'secret'
      }).then((user) => {
        return user.createTodo({
          text: `A todo by ${user.name}`
        });
      });
    });
  });

  return {Todos: db.models.todo, Users: db.models.user};
};
