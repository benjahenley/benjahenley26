"use client";

import Link from "next/link";
import { Locales } from "@/infraestructure/interfaces";
import getOptions from "@/infraestructure/data/MenuOptions";
import Options from "@/presentation/components/features/auth/AuthOptions";
import UserSession from "@/presentation/components/features/auth/UserSession";
import { LanguageSelect } from "../../shared/ui/dropdowns/Language";
import ThemeSelect from "../../shared/ui/dropdowns/Theme";
import { FaCoffee } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import AuthOptions from "@/presentation/components/features/auth/AuthOptions";

type Props = {
  locale: Locales;
};

export default function Leftbar({ locale }: Props) {
  const OPTIONS = getOptions(locale);
  const [options, setOptions] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setOptions(false);
      setDropdownOption(false);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed md:w-[10vw] xl:w-[20vw] 2xl:w-[15vw] h-full w-full max-w-full pt-4 overflow-auto hide-scrollbar">
        <div className="relative flex flex-col justify-between h-full">
          <div
            className="relative border-b xl:border-none px-6 2xl:px-4 border-gray-300 dark:border-slate-600 md:flex-col xl:flex-row flex items-center gap-2  justify-start md:py-4 md:pb-8 xl:py-2"
            style={{ width: "inherit" }}>
            <div className="text-gray-800 dark:text-white md:text-5xl lg:text-7xl xl:text-7xl cursor-pointer flex items-center justify-center 2xl:text-8xl">
              <Link href="/">BH</Link>
            </div>
          </div>
          <div className="flex flex-col w-full h-full overflow-auto hide-scrollbar p-2">
            {OPTIONS.map(({ logo, text, href }, key) => {
              return (
                <Link
                  href={href}
                  target={key === 0 ? "" : "_blank"}
                  key={key}
                  className="group">
                  <div
                    key={text}
                    className="py-4 px-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start md:justify-center xl:justify-start items-center gap-4">
                    <div className="transition-transform transform group-hover:scale-110 text-2xl lg:text-3xl xl:text-4xl">
                      {logo}
                    </div>
                    <p className="text-lg transition-transform uppercase transform md:hidden xl:block">
                      {text}
                    </p>
                  </div>
                </Link>
              );
            })}
            <LanguageSelect
              locale={locale}
              isOpen={dropdownOption}></LanguageSelect>
            <ThemeSelect locale={locale} />
          </div>

          <div ref={containerRef}>
            {options && <AuthOptions setOptions={setOptions}></AuthOptions>}
            <UserSession
              toggleOptions={() => setOptions(!options)}></UserSession>
          </div>
        </div>
      </div>
    </>
  );
}
