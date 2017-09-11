import {generateToken} from '../utils/authentication';

const resolvers = {
  Query: {
    me: async (_, args, {mysql: {Users}, user}) => {
      if (user) {
        const response = await Users.findOne({ where: {
          id: user.id
        } });
        return response;
      }

      throw new Error('Permissions denied');
    }
  },
  User: {
    todos: async (user) => {
      const todos = await user.getTodos();
      return todos;
    }
  },
  Todo: {
    user: async ({userId}, data, {dataloaders: {userLoader}}) => {
      const user = await userLoader.load(userId);
      return user;
    }
  },
  Mutation: {
    createTodo: async (root, data, {mysql: {Todos}, user}) => {
      if (user) {
        const newTodo = {
          text: data.input.text,
          userId: user.id
        };
        const response = await Todos.create(newTodo);
        return {todo: response};
      }

      throw new Error('Permissions denied');
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
          token: generateToken(user),
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
