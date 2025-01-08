import {
  AddTweetArgs,
  TranslationInput,
  TweetImageInput,
} from "../infraestructure/interfaces";
import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    tweets: async (
      _: any,
      args: { language: string; category: "PROJECT" | "FEED" }
    ) => {
      if (!["PROJECT", "FEED"].includes(args.category)) {
        throw new Error("Invalid category value. Must be 'PROJECT' or 'FEED'");
      }

      return await prisma.tweet.findMany({
        where: {
          category: args.category,
        },
        orderBy: [{ pinned: "desc" }, { date: "desc" }],
        include: {
          translations: {
            where: { language: args.language },
          },
          images: true,
          _count: {
            select: { comments: true, likes: true, reposts: true },
          },
        },
      });
    },
  },

  Mutation: {
    addTweet: async (_: any, args: AddTweetArgs, context: any) => {
      const { prisma } = context;

      if (args.category !== "PROJECT" && args.category !== "FEED") {
        throw new Error("Invalid category value. Must be 'PROJECT' or 'FEED'");
      }

      if (!args.translations || args.translations.length === 0) {
        throw new Error("Translations cannot be empty.");
      }

      const newTweet = await prisma.tweet.create({
        data: {
          date: args.date ?? new Date().toISOString(),
          techStack: args.techStack,
          category: args.category,
          pinned: args.pinned || false,
          userId: args.userId,
          link: args.link || null,
          translations: {
            create: args.translations.map((translation: TranslationInput) => ({
              language: translation.language,
              content: translation.content,
            })),
          },
          images: {
            create: args.images.map((image: TweetImageInput) => ({
              src: image.src,
              alt: image.alt,
            })),
          },
        },
        include: {
          translations: true,
          images: true,
        },
      });

      return newTweet;
    },
    // likeTweet: async (_: any, tweetId: number) => {
    //   const updatedTweet = await prisma.tweet.update({
    //     where: { id: tweetId },
    //     data: { likes: { increment: 1 } },
    //     include: { comments: true },
    //   });
    //   return updatedTweet;
    // },
    // repostTweet: async (_, { tweetId }) => {
    //   const updatedTweet = await prisma.tweet.update({
    //     where: { id: tweetId },
    //     data: { reposts: { increment: 1 } },
    //     include: { comments: true },
    //   });
    //   return updatedTweet;
    // },
    // addComment: async (_, { tweetId, content }, { userId }) => {
    //   const newComment = await prisma.comment.create({
    //     data: {
    //       content,
    //       tweet: { connect: { id: tweetId } },
    //       author: { connect: { id: userId } },
    //     },
    //   });
    //   return newComment;
    // },
  },
};
