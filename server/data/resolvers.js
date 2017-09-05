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
    createTodo: async (root, data, {mysql: {Todos}}) => {
      const newTodo = {
        text: data.input.text,
        userId: data.input.user
      };
      const response = await Todos.create(newTodo);
      return {todo: response};
    }
  }
};

export default resolvers;
