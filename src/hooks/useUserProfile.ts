"use client";

import { useQuery } from "@apollo/client/react";
import { GET_USER_BY_ID } from "@/lib/graphql/queries";

// Shape of the user as exposed by the GraphQL schema (api/user/user.model.ts).
export interface GraphQLUser {
  id: string;
  handle: string;
  userFirstName: string;
  userLastName: string;
  email: string;
  profileImage?: string | null;
}

interface GetUserByIdData {
  getUserById: GraphQLUser | null;
}

interface GetUserByIdVars {
  id: number;
}

/**
 * Fetches a single user via GraphQL. This is the read-side counterpart to the
 * REST calls used elsewhere — chosen here because a profile is a single entity
 * where selecting exactly the needed fields (and nothing else) is the natural
 * fit for GraphQL.
 */
export const useUserProfile = (id: number) => {
  const { data, loading, error } = useQuery<GetUserByIdData, GetUserByIdVars>(
    GET_USER_BY_ID,
    {
      variables: { id },
      skip: !id,
    }
  );

  return {
    user: data?.getUserById ?? null,
    loading,
    error,
  };
};
