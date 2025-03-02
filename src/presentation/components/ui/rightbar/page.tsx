"use client";

import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import ProfilePic from "../MyProfilePic";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  locale: Locales;
};

export default function RightBar({ locale }: Props) {
  const { trends, people } =
    contents[locale]?.ui?.twitter || contents["es"].ui.twitter;
  const [trendsBox, setTrendsBox] = useState(false);
  const [displayedTrends, setDisplayedTrends] = useState<
    Array<{ title: string; tag: string; posts: string; url: string }>
  >([]);

  // Mock user activity data
  const userActivity = {
    title: locale === "en" ? "Recent Activity" : "Actividad Reciente",
    more: locale === "en" ? "Show more" : "Mostrar más",
    less: locale === "en" ? "Show less" : "Mostrar menos",
    activities: [
      {
        name: "Tony Stark",
        username: "@ironman",
        verified: true,
        avatar: "👨‍🔬",
        action:
          locale === "en"
            ? "liked your MERN Stack project"
            : "le gustó tu proyecto MERN Stack",
        time: "2m",
      },
      {
        name: "Bruce Wayne",
        username: "@batman",
        verified: true,
        avatar: "🦇",
        action:
          locale === "en" ? "joined the platform" : "se unió a la plataforma",
        time: "5m",
      },
      {
        name: "Peter Parker",
        username: "@spiderman",
        verified: true,
        avatar: "🕸️",
        action:
          locale === "en"
            ? "commented on your React Native app"
            : "comentó en tu aplicación React Native",
        time: "15m",
      },
      {
        name: "Hermione Granger",
        username: "@hgranger",
        verified: true,
        avatar: "🧙‍♀️",
        action:
          locale === "en"
            ? "starred your portfolio repository"
            : "destacó tu repositorio de portafolio",
        time: "27m",
      },
      {
        name: "Gandalf",
        username: "@theGrey",
        verified: true,
        avatar: "🧙‍♂️",
        action:
          locale === "en"
            ? "shared your TypeScript tutorial"
            : "compartió tu tutorial de TypeScript",
        time: "1h",
      },
      {
        name: "Lara Croft",
        username: "@tombraider",
        verified: true,
        avatar: "🏺",
        action:
          locale === "en" ? "followed your projects" : "siguió tus proyectos",
        time: "2h",
      },
      {
        name: "Mario Bros",
        username: "@itsamemario",
        verified: true,
        avatar: "🍄",
        action:
          locale === "en"
            ? "liked your game development post"
            : "le gustó tu publicación sobre desarrollo de juegos",
        time: "3h",
      },
    ],
  };

  useEffect(() => {
    const updateTrends = () => {
      const items = window.innerWidth > 1536 ? 6 : 4;
      setDisplayedTrends(
        trendsBox ? trends.list.slice(0, items) : trends.list.slice(0, 3)
      );
    };

    // Initial update
    updateTrends();

    // Add resize listener
    window.addEventListener("resize", updateTrends);

    // Clean up
    return () => window.removeEventListener("resize", updateTrends);
  }, [trendsBox, trends.list]);

  return (
    <>
      <div className="h-full pb-6 pr-2 md:pr-4 fixed dark:text-white flex flex-col gap-4 w-[inherit] max-w-[320px] md:max-w-[300px]">
        {/* Trends Section */}
        <div className="border border-gray-300 dark:border-slate-600 rounded-xl top-2 pt-4">
          <div className=" dark:text-white font-bold w-full text-xl px-3 md:px-4 border-b border-gray-300 dark:border-slate-600 pb-3">
            {trends.title}
          </div>
          <ul
            className={`flex flex-col w-full border-b border-gray-300 dark:border-slate-600 overflow-hidden`}>
            {displayedTrends.map(({ title, posts, tag, url }, index) => (
              <li
                key={index}
                className="px-3 md:px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-0 p-0 flex flex-col">
                  <span className="text-gray-500 m-0 p-0 text-sm ">{tag}</span>
                  <span
                    className="text-md font-semibold"
                    style={{ lineHeight: "0.9" }}>
                    {title}
                  </span>
                  <span className="text-gray-500 m-0 p-0 text-sm">
                    {posts} {trends.posts}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div
            onClick={() => setTrendsBox(!trendsBox)}
            className="px-3 md:px-4 bottom-2 w-full py-2 text-blue-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 rounded-b-xl group">
            <p className="group-hover:font-semibold tracking-wide">
              {trendsBox ? trends.less : trends.more}
            </p>
          </div>
        </div>

        {/* User Activity Section */}
        <div className="border border-gray-300 dark:border-slate-600 rounded-xl flex flex-col overflow-hidden">
          <div className="dark:text-white font-bold w-full text-xl px-3 md:px-4 border-b border-gray-300 dark:border-slate-600 pb-3 pt-4 sticky top-0   z-10">
            {userActivity.title}
          </div>
          <ul className="flex flex-col w-full overflow-y-auto max-h-[250px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {userActivity.activities.map((activity, index) => (
              <li
                key={index}
                className="grid grid-cols-[auto_1fr] grid-rows-2 px-3 md:px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-slate-700 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                <div className="w-fit mr-3 row-span-1 self-center">
                  <FaUserCircle className="text-gray-700 dark:text-gray-300 w-8 h-8" />
                </div>
                <div className="flex-1 flex-grow min-w-0">
                  <div className="flex flex-row justify-between gap-1">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-medium truncate max-w-[150px]">
                        {activity.name}
                      </span>
                      {activity.verified && (
                        <MdVerified className="text-blue-500 text-sm flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-gray-500 text-xs flex-shrink-0">
                      {activity.time}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {activity.username}
                  </div>
                </div>
                <div className="col-start-2 mt-1 text-sm">
                  {activity.action}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
