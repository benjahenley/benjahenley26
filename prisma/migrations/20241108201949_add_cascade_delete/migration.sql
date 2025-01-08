-- DropForeignKey
ALTER TABLE "TweetTranslation" DROP CONSTRAINT "TweetTranslation_tweetId_fkey";

-- AddForeignKey
ALTER TABLE "TweetTranslation" ADD CONSTRAINT "TweetTranslation_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
