import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    hello: String!
    getAllPosts: [Post!]! @isAuth
    getPostById(id: ID!): Post!
  }

  extend type Mutation {
    createNewPost(newPost: PostInput!): Post!
    editPostById(updatedPost: PostInput, id: ID): Post!
    deletePostById(id: ID!): PostNotification!
  }

  type PostNotification {
    id: ID!
    message: String!
    success: Boolean!
  }

  input PostInput {
    title: String!
    content: String!
    featuredImage: String
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    featuredImage: String
    createdAt: String
    updatedAt: String
  }
`;
