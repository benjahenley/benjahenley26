import Link from "next/link";
import { Locales } from "@/infraestructure/interfaces";
import getOptions from "@/infraestructure/data/MenuOptions";

import { useAtom } from "jotai";
import Options from "@/presentation/components/features/auth/AuthOptions";
import UserSession from "@/presentation/components/features/auth/UserSession";
import { LanguageSelect } from "../dropdowns/Language";
import ThemeSelect from "../dropdowns/Theme";
import { useState } from "react";

type Props = {
  locale: Locales;
};

export default function Leftbar({ locale }: Props) {
  const OPTIONS = getOptions(locale);
  const [options, setOptions] = useState(false);
  return (
    <>
      <div className="fixed md:w-[10vw] xl:w-[20vw] 2xl:w-[15vw] h-full w-full max-w-full pt-4 overflow-auto hide-scrollbar">
        <div className="relative flex flex-col justify-between h-full">
          <div>
            <div
              className="border-b xl:border-none px-6 2xl:px-4 border-gray-300 dark:border-slate-600 md:flex-col xl:flex-row flex items-center gap-2 xl:gap-14 justify-between md:py-4 md:pb-8 xl:py-2"
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
              <LanguageSelect locale={locale} isOpen={false} />
              <ThemeSelect locale={locale} />
              {/* <div className="">
              </div> */}
            </div>
          </div>
          <div>
            {options && <Options setOptions={() => {}} />}
            <UserSession toggleOptions={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
}
