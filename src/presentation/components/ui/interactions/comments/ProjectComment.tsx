import { MdPushPin } from "react-icons/md";
import React from "react";
import ProfilePic from "../../MyProfilePic";
// import InteractionItem from "./interactions";
// import INTERACTIONS from "../../../infraestructure/data/interactions/page";

import formatDate from "@/utils/formatDate";
import iconMapping from "@/utils/iconMapping";
import { TextBase } from "../../Texts";
import { Locales } from "@/infraestructure/interfaces";

type Props = {
  pinned?: boolean;
  className?: string;
  createdAt: Date;
  likes: number;
  comments: number;
  reposts: number;
  locale: Locales;
  description: string;
};

function ProjectComment({
  className,
  createdAt,
  likes,
  comments,
  reposts,
  locale,
  pinned,
  description,
}: Props) {
  const counts: any = { likes, comments, reposts };
  console.log(createdAt);

  return (
    <div className={className}>
      <article className="cursor-pointer transition-all duration-200 border-b border-slate-300 dark:border-gray-600 grid grid-cols-[auto_1fr] gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
        {pinned && (
          <div className="grid justify-end items-center">
            <MdPushPin className="text-xs text-gray-500" />
          </div>
        )}
        {pinned && (
          <p className="text-xs">
            {locale === "en" ? "Pinned Tweet" : "Tweet Fijado"}
          </p>
        )}
        <ProfilePic small className="relative" />
        <div>
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-row gap-1 items-center">
              <h5 className="text-md font-bold">Benja Henley</h5>
              <p className={`text-xs text-gray-700 dark:text-white mt-[2px]`}>
                @benjahenley
              </p>
            </div>
            <time className="text-xs text-gray-700 dark:text-white">
              12 jan 2025
            </time>
          </div>
          <TextBase className="mb-4 text-black">{description!}</TextBase>

          {/* <ul className="mt-3 flex justify-around w-full max-w-lg mx-auto">
            {INTERACTIONS.slice(0, 4).map(
              ({ icon, clicked, text, key, color, colorText }) => (
                <InteractionItem
                  onClick={() => {}}
                  key={key}
                  icon={icon}
                  clicked={clicked}
                  text={text}
                  color={color}
                  colorText={colorText}
                  count={counts[key]}
                />
              )
            )}
            <div className="flex flex-row">
              {INTERACTIONS.slice(4).map(
                ({ icon, clicked, text, key, color, colorText }) => (
                  <InteractionItem
                    onClick={() => {}}
                    key={key}
                    icon={icon}
                    clicked={clicked}
                    text={text}
                    color={color}
                    colorText={colorText}
                    count={counts[key]}
                  />
                )
              )}
            </div>
          </ul> */}
        </div>
      </article>
    </div>
  );
}

export default ProjectComment;
