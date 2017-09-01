import { User, Todo } from '../db';

const resolvers = {
  Query: {
    user (_, args) {
      return User.find({ where: args });
    },
    users (_, args) {
      return User.findAll();
    },
    todos (_, args) {
      return Todo.findAll();
    }
  },
  User: {
    todos (user) {
      return user.getTodos();
    }
  },
  Todo: {
    user (todo) {
      return todo.getUser();
    }
  }
};

export default resolvers;
