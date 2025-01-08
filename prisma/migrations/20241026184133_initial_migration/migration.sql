-- CreateEnum
CREATE TYPE "TweetCategory" AS ENUM ('REGULAR', 'FEATURED');

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "category" "TweetCategory" NOT NULL DEFAULT 'REGULAR',
ADD COLUMN     "pinned" BOOLEAN NOT NULL DEFAULT false;
