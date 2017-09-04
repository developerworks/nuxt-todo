import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  user(id: ID!): User
  users: [User]!
  todos: [Todo]!
}
type User {
  id: Int
  firstName: String
  lastName: String
  todos: [Todo]
}
type Todo {
  id: Int
  title: String
  text: String
  user: User
}
type Mutation {
  createTodo (title: String!, text: String!, user: Int!): Todo
}
`;

export default makeExecutableSchema({ typeDefs, resolvers });
