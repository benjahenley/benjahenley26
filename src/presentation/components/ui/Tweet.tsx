import { PinIcon } from "../../../../public/svgs";
import React from "react";
import ProfilePic from "./MyProfilePic";
import InteractionItem from "./TweetInteractions";
import INTERACTIONS from "../../../infraestructure/data/interactions/page";
import { TweetContentProps } from "@/infraestructure/interfaces";
import formatDate from "@/utils/formatDate";
import iconMapping from "@/utils/iconMapping";
import { TextBase } from "./Texts";

function Tweet({
  className,
  techStack,
  pinned,
  date,
  likes,
  comments,
  reposts,
  saves,
  locale,
  translations,
  images,
}: TweetContentProps) {
  const counts: any = { likes, comments, reposts, saves };

  return (
    <div className={className}>
      <article className="cursor-pointer transition-all duration-200 border-b border-slate-300 dark:border-gray-600 grid grid-cols-[auto_1fr] gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
        {pinned && (
          <div className="grid justify-end items-center">
            <PinIcon className="w-2.5 h-2.5 text-gray-500" />
          </div>
        )}
        {pinned && (
          <p className="text-xs">
            {locale === "en" ? "Pinned Tweet" : "Tweet Fijado"}
          </p>
        )}
        <ProfilePic small />
        <div>
          <div className="flex items-center gap-2">
            <h5 className="text-md font-bold">Benja Henley</h5>
            <span>•</span>
            <time className="text-xs text-gray-700 dark:text-white">
              {formatDate(date)}
            </time>
          </div>
          <TextBase className="mb-4">
            {translations?.[0]?.content || "No content available"}
          </TextBase>
          <div className="justify-end w-full gap-3 flex flex-row my-2 flex-wrap">
            {techStack.length > 0 && (
              <>
                <p className="font-bold text-gray-800 dark:text-white">
                  Tech used:
                </p>
                {techStack.map((tech, key) => {
                  const Icon = iconMapping[tech];
                  if (!Icon) {
                    console.warn(`No icon found for tech: ${tech}`);
                    return null;
                  }
                  return (
                    <div
                      key={key}
                      className="flex items-center gap-2 hover:scale-110">
                      <Icon className="text-lg text-gray-800 dark:text-white" />
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div>
            {images &&
              images.map((image, key) => {
                return (
                  <div key={key} className="overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="hover:scale-105 transition-transform duration-200 animate-scale"
                    />
                  </div>
                );
              })}
          </div>

          <ul className="mt-3 flex justify-around w-full max-w-lg mx-auto">
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
          </ul>
        </div>
      </article>
    </div>
  );
}

export default Tweet;
