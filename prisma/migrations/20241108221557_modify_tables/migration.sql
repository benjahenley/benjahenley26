/*
  Warnings:

  - You are about to drop the column `content` on the `TweetLike` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `TweetRepost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TweetLike" DROP COLUMN "content";

-- AlterTable
ALTER TABLE "TweetRepost" DROP COLUMN "content";
