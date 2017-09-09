import {generateToken} from '../utils/authentication';

const resolvers = {
  Query: {
    user: async (_, args, {mysql: {Users}}) => {
      return Users.find({ where: args });
    },
    users: async (_, args, {mysql: {Users}}) => {
      return Users.findAll({ where: args });
    },
    todos: async (_, args, {mysql: {Todos}}) => {
      return Todos.findAll({ where: args });
    }
  },
  User: {
    todos: async (user) => {
      return user.getTodos();
    }
  },
  Todo: {
    user: async (todo) => {
      return todo.getUser();
    }
  },
  Mutation: {
    createTodo: async (root, data, {mysql: {Todos}, user}) => {
      const newTodo = {
        text: data.input.text,
        userId: user.id
      };
      const response = await Todos.create(newTodo);
      return {todo: response};
    },
    createUser: async (root, data, {mysql: {Users}}) => {
      const newUser = {
        name: data.input.name,
        email: data.input.email,
        password: data.input.password
      };
      const response = await Users.create(newUser);
      return {user: response};
    },
    signinUser: async (root, data, {mysql: {Users}}) => {
      const user = await Users.findOne({where: {email: data.input.email}});
      if (!user) throw new Error('User not found');

      if (user.validPassword(data.input.password)) {
        const response = {
          token: `token-${generateToken(user)}`,
          user: user
        };
        return response;
      } else {
        throw new Error(`Password doesn't match.`);
      }
    }
  }
};

export default resolvers;
