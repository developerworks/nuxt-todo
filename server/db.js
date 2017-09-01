import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import path from 'path';

const db = new Sequelize('nuxt_todo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const UserModel = db.import(path.resolve('./server/models/User.js'));
const TodoModel = db.import(path.resolve('./server/models/Todo.js'));

UserModel.hasMany(TodoModel);
TodoModel.belongsTo(UserModel);

// create mock data with a seed, so we always get the same

db.sync({ force: true }).then(() => {
  _.times(4, () => {
    return UserModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name
    }).then((user) => {
      return user.createTodo({
        title: `A todo by ${user.firstName}`,
        text: casual.sentences(3)
      });
    });
  });
});

const User = db.models.user;
const Todo = db.models.todo;

export { User, Todo, db };
