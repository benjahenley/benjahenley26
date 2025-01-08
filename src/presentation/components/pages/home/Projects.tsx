import Tweet from "../../ui/Tweet";
import { Locales, TweetContentProps } from "@/infraestructure/interfaces/index";
import { useQuery } from "@apollo/client";
import { GET_TWEETS } from "@/graphql/queries/getTweets";
import { Spinner } from "../../ui/Spinner";

type Props = {
  locale: Locales;
  className?: string;
};

export default function Projects({ locale, className }: Props) {
  const { loading, error, data } = useQuery(GET_TWEETS, {
    variables: {
      language: locale as string,
      category: "PROJECT",
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
    console.log(error.message);
    return (
      <div className="w-full h-auto flex justify-center items-center">
        <img src="/photos/error/404.jpg" className="w-full h-auto "></img>
      </div>
    );
  }
  return (
    <div>
      <div className={className}>
        {data?.tweets.map((tweet: TweetContentProps, index: number) => (
          <Tweet {...tweet} key={index}></Tweet>
        ))}
      </div>
    </div>
  );
}
