import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    tweets(language: String, category: TweetCategory): [Tweet!]!
  }

  enum TweetCategory {
    PROJECT
    FEED
  }

  type Tweet {
    id: ID!
    date: String!
    images: [TweetImage!]
    techStack: [String!]
    comments: [TweetComment!]
    reposts: [TweetRepost!]
    likes: [TweetLike!]
    category: TweetCategory
    pinned: Boolean!
    translations(language: String): [TweetTranslation!]!
    user: User
    link: String
    createdAt: String!
    updatedAt: String!
  }

  type TweetImage {
    src: String!
    alt: String!
  }

  type TweetComment {
    id: ID!
    content: String!
    userId: Int!
    tweetId: String!
    createdAt: String!
  }

  type TweetTranslation {
    id: ID!
    language: String!
    content: String!
  }

  type User {
    id: ID!
    name: String!
    profileImage: String
    tweets: [Tweet!]
    comments: [TweetComment!]
  }

  type TweetLike {
    id: ID!
    user: User!
    tweet: Tweet!
    createdAt: String!
    updatedAt: String!
  }

  type TweetRepost {
    id: ID!
    user: User!
    tweet: Tweet!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    addTweet(
      techStack: [String!]
      category: String!
      pinned: Boolean
      userId: Int!
      translations: [TweetTranslationInput!]!
      images: [TweetImageInput!]
      link: String
    ): Tweet!
    # likeTweet(tweetId: ID!): Tweet!
    # repostTweet(tweetId: ID!): Tweet!
    # addComment(tweetId: ID!, content: String!): Comment!
  }

  input TweetImageInput {
    src: String!
    alt: String!
  }

  input TweetCommentInput {
    content: String!
  }

  input TweetTranslationInput {
    language: String!
    content: String!
  }

  input TweetLikeInput {
    userId: Int!
  }

  input TweetRepostInput {
    userId: Int!
  }
`;
