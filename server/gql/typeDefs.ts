export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    title: String!
    author: User!
  }
  type Query {
    hello: String
    users: [User!]!
    posts: [Post!]!
  }
  type Mutation {
    createUser(name: String!): User
    updateUser(id: ID!, name: String!): User
    createPost(userId: ID!, title: String!): Post
  }
`;
