"use client";

import { Locales } from "@/infraestructure/interfaces/locales";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoLanguage } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { contents } from "@/data/contents/content";
import { langOptions } from "@/atoms/lang";

type Props = {
  sidebar?: boolean;
  locale: Locales;
};

export const LanguageSelect: FC<Props> = ({ sidebar, locale }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pageContent = contents[locale] || contents["es"];

  const leftBar = pageContent.ui.leftbar;

  const LANGUAGES = [
    { code: "en", name: leftBar.languages.en, flag: "🇬🇧" },
    { code: "es", name: leftBar.languages.es, flag: "🇪🇸" },
  ];

  const changeLanguage = (newLocale: Locales) => {
    const url = window.location.pathname.split("/").slice(2).join("/");
    if (newLocale !== locale) {
      router.push(`/${newLocale}/${url}`);
      setDropdown(false);
    } else return;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col items-start relative group w-full`}>
      <button
        style={{ width: "inherit" }}
        onClick={() => setDropdown(!dropdown)}
        className="px-4 py-3 md:py-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-between md:justify-center xl:justify-between items-center w-full">
        <div className="flex flex-row items-center gap-4 ">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl transition-transform transform group-hover:scale-110">
            <IoLanguage />
          </div>
          <p className=" uppercase text-md md:hidden xl:block xl:text-lg transition-transform transform ">
            {leftBar.items[6]}
          </p>
        </div>
        <MdKeyboardArrowDown
          className={`text-2xl md:hidden xl:block transform transition-transform ${
            dropdown ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {dropdown && (
        <div className="h-full overflow-x-hidden w-full">
          <ul className="w-full" role="none" onClick={() => setDropdown(false)}>
            {LANGUAGES.map(({ code, name, flag }) => (
              <li className="w-full" key={code}>
                <button
                  className="w-full"
                  onClick={() => changeLanguage(code as Locales)}>
                  <div
                    className={`px-4 lg:px-[22px] lg:rounded-lg py-1 w-full dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start md:justify-center xl:justify-between items-center gap-4 md:gap-6 ${
                      locale === code ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}>
                    <div className="flex flex-row justify-center items-center gap-5 lg:gap-6 ">
                      <div className="text-sm lg:text-xl xl:text-2xl grayscale dark:grayscale">
                        {flag}
                      </div>
                      <p className="md:hidden xl:block text-sm md:text-base text-gray-800 dark:text-white">
                        {name}
                      </p>
                    </div>
                    {locale === code && (
                      <p className="hidden xl:flex text-blue-400">·</p>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
