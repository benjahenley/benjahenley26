import { Locales } from "@/infraestructure/interfaces";
import { useAtom } from "jotai";
import { FaWifi } from "react-icons/fa";
import { contents } from "@/data/contents/content";
import { isFollowingAtom } from "@/atoms/following";

type Props = {
  locale: Locales;
  className: string;
};

export function FollowButtonHome({ className, locale }: Props) {
  const [isFollowing, setIsFollowing] = useAtom(isFollowingAtom);

  const { followButton, followButtonClicked } =
    contents[locale]?.pages?.home?.bio || contents["es"].pages.home.bio;

  return (
    <button
      onClick={() => setIsFollowing(!isFollowing)}
      className={`${className} flex gap-2 items-center rounded-full ${
        isFollowing
          ? "bg-gray-400 dark:bg-gray-600"
          : "bg-purple-700 dark:bg-emerald-500"
      }`}>
      <h5>{isFollowing ? followButtonClicked : followButton}</h5>
      <FaWifi className="text-sm rotate-45" />
    </button>
  );
}
