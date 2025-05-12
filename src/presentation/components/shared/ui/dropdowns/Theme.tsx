"use client";

import { useState, useEffect, useRef } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/atoms/darkmode";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";
import dynamic from "next/dynamic";

// Import DropdownPortal dynamically to avoid SSR issues
const DropdownPortal = dynamic(() => import("./DropdownPortal"), {
  ssr: false,
});

type Props = {
  locale: Locales;
  isOpen?: boolean;
  onOpen?: () => void;
};

export const ThemeSelect = ({ locale, isOpen, onOpen }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);
  const [isMobile, setIsMobile] = useState(false);

  const theme =
    contents[locale].ui.leftbar.theme || contents["es"].ui.leftbar.theme;

  const THEMES = [
    { mode: "light", label: theme.light, icon: <MdOutlineLightMode /> },
    { mode: "dark", label: theme.dark, icon: <MdOutlineDarkMode /> },
  ];

  const handleThemeChange = (newTheme: string) => {
    const shouldBeDark = newTheme === "dark";
    if (shouldBeDark !== isDarkMode) {
      setIsDarkMode(shouldBeDark);
      document.documentElement.classList.toggle("dark", shouldBeDark);
    }
    if (onOpen) onOpen();
  };

  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        onOpen && onOpen();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, onOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

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

  // For mobile view - inline dropdown
  const MobileDropdown = () => (
    <div className="h-full overflow-x-hidden w-full">
      <ul
        className="w-full"
        role="menu"
        aria-labelledby="theme-menu"
        onClick={() => onOpen && onOpen()}>
        {THEMES.map(({ mode, label, icon }) => (
          <li className="w-full" key={mode}>
            <button className="w-full" onClick={() => handleThemeChange(mode)}>
              <div
                className={`px-4 lg:px-[22px] lg:rounded-lg py-2 w-full justify-between md:justify-center xl:justify-between ${
                  isDarkMode === (mode === "dark")
                    ? "bg-gray-200 dark:bg-gray-600"
                    : ""
                } dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start items-center gap-4 transition-colors duration-200`}>
                <div className="flex flex-row justify-center items-center gap-5 md:gap-6">
                  <div className="text-lg lg:text-xl xl:text-2xl">{icon}</div>
                  <p className="text-sm flex text-gray-800 dark:text-white md:text-base md:hidden xl:flex">
                    {label}
                  </p>
                </div>
                {isDarkMode === (mode === "dark") && (
                  <p className="flex text-blue-400 md:hidden xl:flex">·</p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col items-start relative w-full">
      <button
        ref={buttonRef}
        onClick={onOpen}
        className="group px-4 py-3 md:py-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200/40 dark:hover:bg-slate-700/30 border-l-2 border-transparent dark:hover:border-emerald-400 hover:border-violet-500 transition-all duration-200 cursor-pointer flex flex-row justify-between md:justify-center xl:justify-between items-center w-full">
        <div className="flex flex-row items-center gap-4">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl transition-transform transform group-hover:scale-105 ">
            {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </div>
          <p className="uppercase text-md md:hidden xl:block xl:text-lg">
            {theme.themeTitle}
          </p>
        </div>
        <MdKeyboardArrowDown
          className={`text-2xl transform transition-transform flex md:hidden xl:flex ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {/* Desktop dropdown with portal - Only render on non-mobile screens */}
      {!isMobile && isOpen && (
        <DropdownPortal isOpen={isOpen} triggerRef={buttonRef} onClose={onOpen}>
          <ul className="w-48" role="menu" aria-labelledby="theme-menu">
            {THEMES.map(({ mode, label, icon }) => (
              <li className="w-full" key={mode}>
                <button
                  className="w-full"
                  onClick={() => handleThemeChange(mode)}>
                  <div
                    className={`px-4 py-2 w-full dark:text-white hover:bg-gray-100/30 dark:hover:bg-slate-700/30 border-l-2 border-transparent dark:hover:border-emerald-400 hover:border-violet-500 transition-all duration-200 cursor-pointer flex flex-row items-center gap-4 ${
                      isDarkMode === (mode === "dark")
                        ? "bg-gray-200/70 dark:bg-slate-600/70"
                        : ""
                    }`}>
                    <div className="text-xl">{icon}</div>
                    <p className="text-gray-800 dark:text-white">{label}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </DropdownPortal>
      )}

      {/* Mobile dropdown (inline) - only show on mobile */}
      {isMobile && isOpen && <MobileDropdown />}
    </div>
  );
};

export default ThemeSelect;
