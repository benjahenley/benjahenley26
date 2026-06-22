"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { Locales } from "@/infraestructure/interfaces";
import Tweet from "../../shared/ui/cards/Tweet";
import { getFeedTweets, getMyInteractions, FeedTweet } from "@/utils/tweets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// CKEditor touches the DOM at import time, so load the composer client-only.
const PostTweet = dynamic(() => import("../../features/feed/PostTweet"), {
  ssr: false,
});

type Props = {
  locale: Locales;
  className?: string;
};

export default function Feed({ locale, className }: Props) {
  const [activeTweetId, setActiveTweetId] = useState<string | null>(null);
  const [tweets, setTweets] = useState<FeedTweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken] = useAtom(accessTokenAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateTweetQuery = useCallback(
    (tweetId: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (tweetId) {
        params.set("tab", "feed");
        params.set("tweet", tweetId);
      } else {
        params.delete("tweet");
        if (params.get("tab") === "feed") {
          params.delete("tab");
        }
      }

      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const loadFeed = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFeedTweets(locale);
      let merged = data;

      // If logged in, mark which tweets this user has liked/reposted/saved.
      if (accessToken) {
        try {
          const mine = await getMyInteractions(accessToken);
          const liked = new Set(mine.likedTweetIds.map(String));
          const reposted = new Set(mine.repostedTweetIds.map(String));
          const saved = new Set(mine.savedTweetIds.map(String));
          merged = data.map((t) => ({
            ...t,
            isLiked: liked.has(t.id),
            isReposted: reposted.has(t.id),
            isSaved: saved.has(t.id),
          }));
        } catch {
          // Non-fatal: show the feed even if interactions fail to load.
        }
      }

      setTweets(merged);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [locale, accessToken]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  useEffect(() => {
    setActiveTweetId(searchParams.get("tweet"));
  }, [searchParams]);

  useEffect(() => {
    if (loading || !activeTweetId) return;

    const tweetExists = tweets.some((tweet) => tweet.id === activeTweetId);
    if (!tweetExists) {
      setActiveTweetId(null);
      updateTweetQuery(null);
    }
  }, [activeTweetId, loading, tweets, updateTweetQuery]);

  const handleCommentsToggle = (isShowing: boolean, tweetId: string) => {
    const nextTweetId = isShowing ? tweetId : null;
    setActiveTweetId(nextTweetId);
    updateTweetQuery(nextTweetId);
  };

  const t = (en: string, es: string) => (locale === "en" ? en : es);

  return (
    <div
      className={`${className} divide-y divide-gray-200 dark:divide-gray-700`}>
      {/* Owner-only composer (renders null for everyone else). Hidden while a
          single tweet's replies are focused. */}
      {!activeTweetId && <PostTweet locale={locale} onPosted={loadFeed} />}

      {loading ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          {t("Loading feed…", "Cargando feed…")}
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">
          {t("Couldn’t load the feed: ", "No se pudo cargar el feed: ")}
          {error}
        </div>
      ) : (
        tweets.map((tweet) => {
          const shouldShowTweet = !activeTweetId || activeTweetId === tweet.id;

          return shouldShowTweet ? (
            <Tweet
              key={tweet.id}
              {...tweet}
              locale={locale}
              showComments={activeTweetId === tweet.id}
              onCommentsToggle={handleCommentsToggle}
            />
          ) : null;
        })
      )}
    </div>
  );
}
