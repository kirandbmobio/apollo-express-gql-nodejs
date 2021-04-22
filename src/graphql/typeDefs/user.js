import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    userInfo: String!
    authenticateUser(username: String!, password: String!): AuthResp!
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResp!
  }

  input UserInput {
    avatarImage: String
    firstName: String!
    username: String!
    lastName: String!
    password: String!
    email: String!
  }

  type User {
    avatarImage: String
    firstName: String!
    username: String!
    lastName: String!
    email: String!
    _id: ID!
  }

  type AuthResp {
    token: String!
    user: User!
  }
`;
