"use client";

import { FaGripLinesVertical } from "react-icons/fa";
import Link from "next/link";
import TwitterSession from "../auth/UserSession";
import { LanguageButton } from "../selects/Language";
import { Locales } from "@/infraestructure/interfaces";
import getOptions from "@/infraestructure/data/menu/page";

type Props = {
  locale: Locales;
  className: string;
  handleClose: () => void;
};

export function LeftbarMobile({ locale, className, handleClose }: Props) {
  const OPTIONS = getOptions(locale);

  return (
    <div className={className}>
      <div
        className="fixed pr-0 md:hidden z-10 top-0 left-0 right-20 bottom-0 max-w-[256px] bg-gray-100 dark:bg-slate-700"
        style={{ width: "inherit" }}>
        <div className="h-full flex flex-row">
          <div className="flex flex-col justify-between h-full w-full">
            <div
              className="px-4 py-1 border-b xl:border-none lg:px-4 border-gray-300 dark:border-slate-600 lg:flex-col xl:flex-row flex items-center gap-2 justify-between lg:py-4 lg:pb-8 xl:py-2"
              style={{ width: "inherit" }}>
              <span className="dark:text-white text-5xl xl:text-7xl cursor-pointer">
                <a href="/">BH</a>
              </span>
              {/* <ThemeSelect /> */}
            </div>

            <div className="flex h-full">
              <div className="py-3 flex flex-col w-full h-full mb-4">
                {OPTIONS.map(({ logo, text, href }, key) => (
                  <Link href={href} key={key}>
                    <div className="py-4 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start lg:justify-center xl:justify-start items-center gap-4 px-4">
                      <div className="text-xl lg:text-4xl">{logo}</div>
                      <p className="lg:hidden xl:block">{text}</p>
                    </div>
                  </Link>
                ))}
                <LanguageButton locale={locale} />
              </div>
              <div
                className="flex h-full flex-col w-fit overflow-hidden justify-center cursor-pointer"
                onClick={handleClose}>
                <FaGripLinesVertical className="text-md dark:text-white" />
              </div>
            </div>
            <TwitterSession />
          </div>
        </div>
      </div>
    </div>
  );
}
