"use client";

import { Locales } from "@/infraestructure/interfaces/locales";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoLanguage } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { contents } from "@/data/contents/content";
import { langOptions } from "@/atoms/lang";
import dynamic from "next/dynamic";

// Import DropdownPortal dynamically to avoid SSR issues
const DropdownPortal = dynamic(() => import("./DropdownPortal"), {
  ssr: false,
});

type Props = {
  sidebar?: boolean;
  locale: Locales;
  isOpen: boolean;
};

export const LanguageSelect: FC<Props> = ({ sidebar, locale, isOpen }) => {
  const [dropdown, setDropdown] = useState(isOpen);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pageContent = contents[locale] || contents["es"];

  const LANGUAGES = [
    { code: "en", name: pageContent.ui.leftbar.languages.en, flag: "🇬🇧" },
    { code: "es", name: pageContent.ui.leftbar.languages.es, flag: "🇦🇷" },
  ];

  const { leftbar } = pageContent.ui;

  // Check if we're on mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is typically 768px
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const changeLanguage = (newLocale: Locales) => {
    const url = window.location.pathname.split("/").slice(2).join("/");
    if (newLocale !== locale) {
      router.push(`/${newLocale}/${url}`);
      setDropdown(false);
    } else return;
  };

  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (dropdown) {
        setDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [dropdown]);

  // For mobile view - inline dropdown
  const MobileDropdown = () => (
    <div className="h-full overflow-x-hidden w-full">
      <ul className="w-full" role="none" onClick={() => setDropdown(false)}>
        {LANGUAGES.map(({ code, name, flag }) => (
          <li className="w-full" key={code}>
            <button
              className="w-full"
              onClick={() => changeLanguage(code as Locales)}>
              <div
                className={`px-4 lg:px-[22px] lg:rounded-lg py-1 w-full dark:text-white hover:bg-gray-100/30 dark:hover:bg-slate-700/30 border-l-2 border-transparent hover:border-violet-500/70 dark:hover:border-green-400/70 transition-all duration-200 cursor-pointer flex flex-row justify-start md:justify-center xl:justify-between items-center gap-4 md:gap-6 ${
                  locale === code ? "bg-gray-200/70 dark:bg-slate-600/70" : ""
                }`}>
                <div className="flex flex-row justify-center items-center gap-5 lg:gap-6">
                  <div className="text-sm lg:text-xl xl:text-2xl hover:text-violet-600 dark:hover:text-green-400">
                    {flag}
                  </div>
                  <p className="md:hidden xl:block text-sm md:text-base text-gray-800 dark:text-white">
                    {name}
                  </p>
                </div>
                {locale === code && (
                  <p className="hidden xl:flex text-violet-600 dark:text-green-400">
                    ·
                  </p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const closeDropdown = () => {
    setDropdown(false);
  };

  return (
    <div className="flex flex-col items-start relative w-full">
      <button
        ref={buttonRef}
        style={{ width: "inherit" }}
        onClick={() => setDropdown(!dropdown)}
        className="group px-4 py-3 md:py-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200/40 dark:hover:bg-slate-700/30 border-l-2 border-transparent dark:hover:border-green-500/70  hover:border-violet-400/70 transition-all duration-200 cursor-pointer flex flex-row justify-between md:justify-center xl:justify-between items-center w-full">
        <div className="flex flex-row items-center gap-4">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl transition-transform transform group-hover:scale-105 ">
            <IoLanguage />
          </div>
          <p className="uppercase text-md md:hidden xl:block xl:text-lg transition-transform transform">
            {leftbar.itemsWithDropdown[0]}
          </p>
        </div>
        <MdKeyboardArrowDown
          className={`text-2xl md:hidden xl:block transform transition-transform ${
            dropdown ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {/* Desktop dropdown with portal - Only render on non-mobile screens */}
      {!isMobile && dropdown && (
        <DropdownPortal
          isOpen={dropdown}
          triggerRef={buttonRef}
          onClose={closeDropdown}>
          <ul className="w-48" role="none">
            {LANGUAGES.map(({ code, name, flag }) => (
              <li className="w-full" key={code}>
                <button
                  className="w-full"
                  onClick={() => changeLanguage(code as Locales)}>
                  <div
                    className={`px-4 py-2 w-full dark:text-white hover:bg-gray-200/40 dark:hover:bg-slate-700/30 border-l-2 border-transparent hover:border-violet-500/70 dark:hover:border-green-400/70 transition-all duration-200 cursor-pointer flex flex-row items-center gap-4 ${
                      locale === code
                        ? "bg-gray-200/70 dark:bg-slate-600/70"
                        : ""
                    }`}>
                    <div className="text-xl hover:text-violet-600 dark:hover:text-green-400">
                      {flag}
                    </div>
                    <p className="text-gray-800 dark:text-white">{name}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </DropdownPortal>
      )}

      {/* Mobile dropdown (inline) - only show on mobile */}
      {isMobile && dropdown && <MobileDropdown />}
    </div>
  );
};
