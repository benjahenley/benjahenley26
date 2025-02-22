"use client";

import Tweet from "../../ui/interactions/comments/ProjectComment";
import { Locales, TweetApiResponse } from "@/infraestructure/interfaces";
import { Spinner } from "../../ui/Spinner";
import { useQuery } from "@apollo/client";
import { GET_TWEETS_BY_CATEGORY } from "@/graphql/queries/getTweets";
import { TweetCategory } from "@/graphql/types";

type Props = {
  locale: Locales;
  className?: string;
};

export default function Feed({ locale, className }: Props) {
  const { loading, error, data } = useQuery(GET_TWEETS_BY_CATEGORY, {
    variables: {
      language: locale as string,
      category: TweetCategory.FEED,
    },
    errorPolicy: "all",
  });

  if (loading) {
    return (
      <>
        <Spinner></Spinner>
      </>
    );
  }
  if (error) {
    console.log("error", error);
    return (
      <div className="w-full h-auto flex justify-center items-center">
        <img src="/photos/error/404.jpg" className="w-full h-auto "></img>
      </div>
    );
  }

  console.log({ data });

  return (
    <div className={className}>
      {data.getTweetsByCategory.map(
        (tweet: TweetApiResponse, index: number) => (
          <Tweet {...tweet} key={index}></Tweet>
        )
      )}
    </div>
  );
}
