/*
  Warnings:

  - The values [REGULAR,FEATURED] on the enum `TweetCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TweetCategory_new" AS ENUM ('PROJECT', 'FEED');
ALTER TABLE "Tweet" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Tweet" ALTER COLUMN "category" TYPE "TweetCategory_new" USING ("category"::text::"TweetCategory_new");
ALTER TYPE "TweetCategory" RENAME TO "TweetCategory_old";
ALTER TYPE "TweetCategory_new" RENAME TO "TweetCategory";
DROP TYPE "TweetCategory_old";
ALTER TABLE "Tweet" ALTER COLUMN "category" SET DEFAULT 'FEED';
COMMIT;

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "category" SET DEFAULT 'FEED';
