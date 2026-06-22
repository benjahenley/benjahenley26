import { gql } from "@apollo/client";

// Mirrors the backend `getUserById` resolver (api/user/user.resolver.ts).
// The `id` arg is typed `number` in the resolver, which NestJS code-first maps
// to the GraphQL `Float` scalar — hence `$id: Float!`.
//
// Note we select exactly the fields the UI needs: this is GraphQL's core win
// over REST — no over-fetching, and `password` is no longer even part of the
// schema (it was removed from the backend User type).
export const GET_USER_BY_ID = gql`
  query GetUserById($id: Float!) {
    getUserById(id: $id) {
      id
      handle
      userFirstName
      userLastName
      email
      profileImage
    }
  }
`;
