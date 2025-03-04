"use client";

import { Locales } from "@/infraestructure/interfaces";
import getOptions from "@/infraestructure/data/menu/page";
import { contents } from "@/data/contents/content";

type Props = {
  locale: Locales;
  className: string;
  handleClose: () => void;
};

export function RightMobile({ locale }: Props) {
  const OPTIONS = getOptions(locale);
  const { trends, people } = contents[locale].ui.twitter;

  return (
    <div
      style={{ width: "inherit" }}
      className="lg:max-w-[280px] overflow-hidden xl:max-w-[230px] 2xl:max-w-[280px] fixed dark:text-white  flex flex-col gap-5">
      <div className="border border-gray-300 dark:border-slate-600 rounded-xl top-2 pt-4 ">
        <div className="dark:text-white font-bold w-full text-xl px-4 border-b border-gray-300 dark:border-slate-600 pb-4">
          {trends.title}
        </div>
        <ul className="flex flex-col w-full border-b border-gray-300 dark:border-slate-600">
          {trends.list.map(({ title, posts, tag, url }, index) => (
            <li
              key={index}
              className="px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-slate-700">
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
        <div className="px-4 bottom-2 w-full py-2 text-blue-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600">
          <p>{trends.more}</p>
        </div>
      </div>
      <div className="border border-gray-300 dark:border-slate-600 rounded-xl top-2 pt-4">
        <div className="dark:text-white font-bold w-full text-xl px-4 border-b border-gray-300 dark:border-slate-600 pb-4">
          {people.title}
        </div>
        <ul className="flex flex-col w-full  max-h-[250px]">
          {people.list.map(({ at, name, url }, index) => (
            <li
              key={index}
              className={`px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-slate-700 ${
                index === 4 ? "rounded-b-xl" : ""
              }`}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="m-0 p-0 flex flex-col">
                <span className="text-gray-500 m-0 p-0 text-sm ">{name}</span>
                <span
                  className="text-md font-semibold"
                  style={{ lineHeight: "0.9" }}>
                  {at}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
