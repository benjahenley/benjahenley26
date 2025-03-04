"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCross, FaGripLinesVertical } from "react-icons/fa";
import Link from "next/link";
import { Locales } from "@/infraestructure/interfaces";
import getOptions from "@/infraestructure/data/menu/page";
import { RxCrossCircled } from "react-icons/rx";
import { useAtom } from "jotai";
import { optionsAtom } from "@/atoms/options";
import { LanguageSelect } from "../../shared/ui/dropdowns/Language";
import ThemeSelect from "../../shared/ui/dropdowns/Theme";
import Options from "@/presentation/components/features/auth/Options";
import UserSession from "@/presentation/components/features/auth/UserSession";

type Props = {
  locale: Locales;
  className?: string;
  isOpen: boolean;
  handleClose: () => void;
};

export function LeftbarMobile({ locale, isOpen, handleClose }: Props) {
  const OPTIONS = getOptions(locale);
  const [options, setOptions] = useAtom(optionsAtom);

  return (
    <>
      {/* Backdrop with Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999998] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0.7 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              duration: 0.3,
            }}
            className="max-h-full fixed pr-0 md:hidden z-[9999999] top-0 left-0 right-20 bottom-0 max-w-[60%] sm:max-w-[50%] bg-gray-100 dark:bg-slate-700">
            <div className="h-full flex flex-row">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="px-4 py-1 border-b xl:border-none lg:px-4 border-gray-300 dark:border-slate-600 lg:flex-col xl:flex-row flex items-center gap-2 justify-between lg:py-4 lg:pb-8 xl:py-2">
                  <span className="dark:text-white text-5xl xl:text-7xl cursor-pointer py-2 flex flex-row justify-between items-center w-full">
                    <div className="text-gray-800 dark:text-white flex items-center justify-center ">
                      <a
                        href="/"
                        className="text-5xl md:text-6xl cursor-pointer">
                        BH
                      </a>
                    </div>
                    <RxCrossCircled
                      className="text-xl text-gray-800 dark:text-white cursor-pointer"
                      onClick={handleClose}
                    />
                  </span>
                </div>

                <div className="flex h-full overflow-scroll">
                  <div className="flex flex-col w-full h-full">
                    {OPTIONS.map(({ logo, text, href }, key) => (
                      <Link href={href} key={key}>
                        <div className="py-3 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start lg:justify-center xl:justify-start items-center gap-4 px-4">
                          <div className="text-xl lg:text-4xl">{logo}</div>
                          <p className="lg:hidden xl:block">{text}</p>
                        </div>
                      </Link>
                    ))}
                    <LanguageSelect locale={locale} />
                    <ThemeSelect locale={locale} />
                  </div>
                </div>
                <div>
                  {options && <Options />}
                  <UserSession />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
