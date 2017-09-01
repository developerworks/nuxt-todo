import { User } from '../db';

const resolvers = {
  Query: {
    user (_, args) {
      return User.find({ where: args });
    },
    users (_, args) {
      return User.findAll();
    }
  },
  User: {
    todos (user) {
      return user.getPosts();
    }
  },
  Todo: {
    user (todo) {
      return todo.getAuthor();
    }
  }
};

export default resolvers;
