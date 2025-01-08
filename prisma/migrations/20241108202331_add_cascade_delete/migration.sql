/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "CommentTranslation" DROP CONSTRAINT "CommentTranslation_commentId_fkey";

-- DropForeignKey
ALTER TABLE "TweetImage" DROP CONSTRAINT "TweetImage_tweetId_fkey";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentTranslation";

-- DropTable
DROP TABLE "PersonalImage";

-- CreateTable
CREATE TABLE "TweetComment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tweetId" INTEGER NOT NULL,

    CONSTRAINT "TweetComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TweetComment" ADD CONSTRAINT "TweetComment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetImage" ADD CONSTRAINT "TweetImage_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
