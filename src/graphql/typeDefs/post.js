import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    hello: String!
    getAllPosts: [Post!]! @isAuth
    getPostsByPageAndLimit(page: Int, limit: Int): PostPaginator!
    getPostById(id: ID!): Post! @isAuth
  }

  extend type Mutation {
    createNewPost(newPost: PostInput!): Post! @isAuth
    editPostById(updatedPost: PostInput, id: ID): Post! @isAuth
    deletePostById(id: ID!): PostNotification! @isAuth
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
    author: User!
  }

  type PostPaginator {
    posts: [Post!]!
    paginator: PostPaginateLabel
  }

  type PostPaginateLabel {
    postCount: Int!
    perPage: Int!
    pageCount: Int!
    currentPage: Int!
    slNo: Int!
    hasPrevPage: Boolean!
    hasNextPage: Boolean!
    prev: Int
    next: Int
  }
`;
