import { gql } from "@apollo/client";

export const GET_TWEETS_BY_CATEGORY = gql`
  query GetTweetsByCategory($language: String!, $category: TweetCategory!) {
    getTweetsByCategory(language: $language, category: $category) {
      id
      date
      techStack
      category
      pinned
      link
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
