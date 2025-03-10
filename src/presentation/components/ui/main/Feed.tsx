"use client";

import { Locales, TweetApiResponse } from "@/infraestructure/interfaces";

type Props = {
  locale: Locales;
  className?: string;
};

export default function Feed({ locale, className }: Props) {
  const data: TweetApiResponse[] = [];
  // if (loading) {
  //   return (
  //     <>
  //       <Spinner></Spinner>
  //     </>
  //   );
  // }
  // if (error) {
  //   console.log("error", error);
  return (
    <div className={className}>
      {/* {data.map((tweet: TweetApiResponse, index: number) => (
        <Tweet {...tweet} key={index}></Tweet>
      ))} */}
    </div>
  );
}

// console.log({ data });
