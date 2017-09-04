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
  /* User: {
    todos (user) {
      return user.getTodos();
    }
  },
  Todo: {
    user (todo) {
      return todo.getUser();
    }
  }, */
  Mutation: {
    createTodo: async (root, data, {mysql: {Todos}}) => {
      const response = await Todos.create(data); // 3
      return response;
    }
  }
};

export default resolvers;
