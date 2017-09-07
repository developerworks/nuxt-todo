import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type User {
  id: ID!
  name: String!
  email: String!
  todos: [Todo]
}
type Todo {
  id: ID!
  text: String!
  completed: Boolean!
  user: User!
}
type Query {
  user(id: Int!): User
  users: [User]!
  todos: [Todo]!
}
type Mutation {
  createTodo (input: CreateTodoInput!): CreateTodoPayload
}
input CreateTodoInput {
  text: String!
  user: Int!
}
type CreateTodoPayload {
  todo: Todo
}
`;

export default makeExecutableSchema({ typeDefs, resolvers });
