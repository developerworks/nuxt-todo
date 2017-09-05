const resolvers = {
  Query: {
    user: async (_, args, {mongo: {Users}}) => {
      Users.find().then((users) => {
        return {users};
      }, (e) => {
        return e;
      });
    },
    /* users: async (_, args, {mongo: {Users}}) => {
      return Users.findAll({ where: args });
    }, */
    todos: async (_, args, {mongo: {Todos}}) => {
      Todos.find().then((todos) => {
        return {todos};
      }, (e) => {
        return e;
      });
    }
  } /* ,
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
    createTodo: async (root, data, {mongo: {Todos}}) => {
      const newTodo = {
        text: data.input.text,
        userId: data.input.user
      };
      const response = await Todos.create(newTodo);
      return {todo: response};
    }
  } */ 
};

export default resolvers;
