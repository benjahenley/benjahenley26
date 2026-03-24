"use client";

import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import RecentActivity from "./RecentActivity";

const styles = `
  .hide-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
  }
  .hide-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .hide-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .hide-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.3);
    border-radius: 20px;
  }
  .hide-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.5);
  }
`;

type Props = {
  locale: Locales;
};

export default function RightBar({ locale }: Props) {
  const { trends } =
    contents[locale]?.ui?.twitter || contents["es"].ui.twitter;
  const [trendsBox, setTrendsBox] = useState(false);
  const [displayedTrends, setDisplayedTrends] = useState<
    Array<{ title: string; tag: string; posts: string; url: string }>
  >([]);

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
      <style>{styles}</style>
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
        <RecentActivity
          title={locale === "en" ? "Recent Activity" : "Actividad reciente"}
          locale={locale}
        />
      </div>
    </>
  );
}
