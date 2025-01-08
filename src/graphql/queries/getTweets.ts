import { gql } from "@apollo/client";

export const GET_TWEETS = gql`
  query GetTweets($language: String!, $category: TweetCategory!) {
    tweets(language: $language, category: $category) {
      id
      date
      techStack
      category
      pinned
      reposts {
        id
        user {
          id
          name
        }
        createdAt
      }
      comments {
        id
        content
        userId
        createdAt
      }
      likes {
        id
        user {
          id
          name
        }
        createdAt
        updatedAt
      }
      images {
        src
        alt
      }
      translations {
        content
        language
      }
      user {
        id
        name
        profileImage
      }
      createdAt
      updatedAt
    }
  }
`;
