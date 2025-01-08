import { Locales } from "@/infraestructure/interfaces";
import { WifiIcon } from "../../../../public/svgs";
import { useState } from "react";
import { contents } from "@/data/contents/content";

type Props = {
  locale: Locales;
  className: string;
};

export function FollowButtonHome({ className, locale }: Props) {
  const [display, setDisplay] = useState(false);
  const { followButton, followButtonClicked } = contents[locale].pages.home.bio;

  return (
    <button
      onClick={() => {
        setDisplay(!display);
      }}
      className={`${className} flex gap-2 items-center rounded-full ${
        display
          ? "bg-gray-400 text-white dark:bg-gray-500"
          : "bg-[#4B6E82] text-white dark:bg-gray-700 "
      }`}>
      <h5>{display ? followButtonClicked : followButton}</h5>
      <WifiIcon className="w-4 h-4" />
    </button>
  );
}
