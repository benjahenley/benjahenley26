"use client";

import { Locales } from "@/infraestructure/interfaces";

type Props = {
  locale: Locales;
  className?: string;
};

export default function Feed({ locale, className }: Props) {
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
    <div className="w-full h-auto flex justify-center items-center">
      <img src="/photos/error/404.jpg" className="w-full h-auto "></img>
    </div>
  );
}

// console.log({ data });

// return (
//   <div className={className}>
//     {data.getTweetsByCategory.map(
//       (tweet: TweetApiResponse, index: number) => (
//         <Tweet {...tweet} key={index}></Tweet>
//       )
//     )}
//   </div>
// );
// }
