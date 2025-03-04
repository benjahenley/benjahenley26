import Link from "next/link";
import { Locales } from "@/infraestructure/interfaces";
import getOptions from "@/infraestructure/data/menu/page";
import { optionsAtom } from "@/atoms/options";
import { useAtom } from "jotai";
import Options from "@/presentation/components/features/auth/Options";
import UserSession from "@/presentation/components/features/auth/UserSession";
import { LanguageSelect } from "../../shared/ui/dropdowns/Language";
import ThemeSelect from "../../shared/ui/dropdowns/Theme";
import { FaCoffee } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

type Props = {
  locale: Locales;
};

export default function Leftbar({ locale }: Props) {
  const OPTIONS = getOptions(locale);
  const [options, setOptions] = useAtom(optionsAtom);

  return (
    <>
      <div className="fixed md:w-[10vw] xl:w-[20vw] 2xl:w-[15vw] h-full w-full max-w-full pt-4 overflow-auto hide-scrollbar">
        <div className="relative flex flex-col justify-between h-full">
          <div>
            <div
              className="relative border-b xl:border-none px-6 2xl:px-4 border-gray-300 dark:border-slate-600 md:flex-col xl:flex-row flex items-center gap-2  justify-start md:py-4 md:pb-8 xl:py-2"
              style={{ width: "inherit" }}>
              <div className="text-gray-800 dark:text-white md:text-5xl lg:text-7xl xl:text-7xl cursor-pointer flex items-center justify-center 2xl:text-8xl">
                <a href="/">BH</a>
              </div>
              <p className=" hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full p-2">
                <a href="https://buymeacoffee.com/benjahenley" target="_blank">
                  <SiBuymeacoffee className="text-2xl text-gray-800 dark:text-white" />
                </a>
              </p>
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
              <LanguageSelect locale={locale}></LanguageSelect>
              <ThemeSelect locale={locale} />
              {/* <div className="">
              </div> */}
            </div>
          </div>
          <div>
            {options && <Options />}
            <UserSession></UserSession>
          </div>
        </div>
      </div>
    </>
  );
}
