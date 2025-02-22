"use client";

import { useState, useEffect, useRef } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/atoms/darkmode";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";

type Props = {
  locale: Locales;
};

export const ThemeSelect = ({ locale }: Props) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

  const theme =
    contents[locale].ui.leftbar.theme || contents["es"].ui.leftbar.theme;

  const THEMES = [
    { mode: "light", label: theme.light, icon: <MdOutlineLightMode /> },
    { mode: "dark", label: theme.dark, icon: <MdOutlineDarkMode /> },
  ];

  const handleThemeChange = (newTheme: string) => {
    const shouldBeDark = newTheme === "dark";
    if (shouldBeDark !== isDarkMode) {
      setIsDarkMode(shouldBeDark); // Update atom
      document.documentElement.classList.toggle("dark", shouldBeDark); // Apply dark class
    }
    setDropdown(false);
  };

  // Close dropdown on outside click
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

  // Sync dark mode class with atom value on initial render
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col items-start relative group w-full">
      {/* Toggle Button */}
      <button
        onClick={() => setDropdown(!dropdown)}
        className="px-4 py-3 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-center xl:justify-between items-center w-full">
        <div className="flex flex-row items-center gap-4">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl transition-transform transform group-hover:scale-110">
            {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </div>
          <p className="uppercase text-md md:hidden xl:block xl:text-lg">
            {theme.themeTitle}
          </p>
        </div>
        <MdKeyboardArrowDown
          className={`text-2xl transform transition-transform hidden xl:flex ${
            dropdown ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {dropdown && (
        <div className="h-full overflow-x-hidden w-full pt-2">
          <ul
            className="w-full"
            role="menu"
            aria-labelledby="theme-menu"
            onClick={() => setDropdown(false)}>
            {THEMES.map(({ mode, label, icon }) => (
              <li className="w-full" key={mode}>
                <button
                  className="w-full"
                  onClick={() => handleThemeChange(mode)}>
                  <div
                    className={`px-4 lg:px-5 rounded-lg py-2 w-full justify-center xl:justify-between ${
                      isDarkMode === (mode === "dark")
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    } dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start items-center gap-4 transition-colors duration-200`}>
                    <div className="flex flex-row justify-center items-center gap-6">
                      <div className="text-lg lg:text-xl xl:text-2xl">
                        {icon}
                      </div>
                      <p className="hidden xl:flex">{label}</p>
                    </div>
                    {isDarkMode === (mode === "dark") && (
                      <p className="hidden xl:flex">·</p>
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

export default ThemeSelect;
