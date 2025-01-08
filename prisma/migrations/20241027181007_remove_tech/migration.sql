/*
  Warnings:

  - You are about to drop the `Technology` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_tweetId_fkey";

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "techStack" TEXT[];

-- DropTable
DROP TABLE "Technology";
