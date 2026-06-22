"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider as Provider } from "@apollo/client/react";

// The GraphQL endpoint. NestJS's setGlobalPrefix('api') does NOT apply to the
// Apollo route, so the schema is served at /graphql (not /api/graphql).
const GRAPHQL_URI = `${
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:10002"
}/graphql`;

// Single client instance for the whole app. Created at module scope so it isn't
// rebuilt on every render. InMemoryCache normalizes results by id, so repeated
// queries for the same entity are served from cache instead of refetching.
const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URI }),
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};
