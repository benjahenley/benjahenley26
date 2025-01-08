import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import prisma from "@/lib/prisma";
import { tweetSchema } from "@/validations/tweetSchema";
import * as yup from "yup";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async ({ req }: any) => {
    const variables = req?.body?.variables || {};

    if (req?.body?.query?.includes("addTweet")) {
      try {
        await tweetSchema.validate(variables, { abortEarly: false });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new Error(`Yup validation error: ${error.errors.join(", ")}`);
        }
      }
    }

    return { prisma };
  },
});

export { handler as GET, handler as POST };
