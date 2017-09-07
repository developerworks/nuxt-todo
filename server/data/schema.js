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
  createUser(input: CreateUserInput!): CreateUserPayload
  signinUser(input: SigninInput!): SigninPayload!
}

input CreateTodoInput {
  text: String!
}
type CreateTodoPayload {
  todo: Todo
}
input CreateUserInput {
  name: String!
  email: String!
  password: String!
}
type CreateUserPayload {
  user: User
}
input SigninInput {
  email: String!
  password: String!
}
type SigninPayload {
  token: String
  user: User
}
`;

export default makeExecutableSchema({ typeDefs, resolvers });
