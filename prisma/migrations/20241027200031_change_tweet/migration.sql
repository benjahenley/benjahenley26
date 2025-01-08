/*
  Warnings:

  - You are about to drop the column `title` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "TweetTranslation" (
    "id" SERIAL NOT NULL,
    "tweetId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "TweetTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TweetTranslation_tweetId_language_key" ON "TweetTranslation"("tweetId", "language");

-- AddForeignKey
ALTER TABLE "TweetTranslation" ADD CONSTRAINT "TweetTranslation_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
