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
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import AuthOptions from "@/presentation/components/features/auth/AuthOptions";
import { SocialsSelect } from "../../shared/ui/dropdowns/Socials";
import { motion, AnimatePresence } from "framer-motion";
import { RxCrossCircled } from "react-icons/rx";

// Make TypeScript aware of our global window property
declare global {
  interface Window {
    toggleLeftbarMobileMenu?: () => void;
  }
}

type Props = {
  locale: Locales;
  className?: string;
};

// Export the types for the ref methods
export type LeftbarRefType = {
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const Leftbar = forwardRef<LeftbarRefType, Props>(
  ({ locale, className = "" }, ref) => {
    const OPTIONS = getOptions(locale);
    const [options, setOptions] = useState(false);
    const [dropdownOption, setDropdownOption] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      toggleMobileMenu: () => {
        console.log("toggleMobileMenu called via ref", isMobileMenuOpen);
        setIsMobileMenuOpen(!isMobileMenuOpen);
      },
      closeMobileMenu: () => {
        setIsMobileMenuOpen(false);
      },
    }));

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

    // Effect to close mobile menu when screen resizes to desktop
    useEffect(() => {
      function handleResize() {
        if (window.innerWidth >= 768 && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isMobileMenuOpen]);

    // Toggle mobile menu (will be triggered from NavbarMobile)
    const toggleMobileMenu = () => {
      console.log(
        "toggleMobileMenu called in Leftbar component",
        isMobileMenuOpen
      );
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu
    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };

    // Make toggleMobileMenu function available to parent components
    useEffect(() => {
      console.log("Setting window.toggleLeftbarMobileMenu");
      window.toggleLeftbarMobileMenu = toggleMobileMenu;

      // Ensure the function is available immediately
      if (typeof window !== "undefined") {
        window.toggleLeftbarMobileMenu = toggleMobileMenu;
      }

      return () => {
        console.log("Cleaning up window.toggleLeftbarMobileMenu");
        if (typeof window !== "undefined") {
          delete window.toggleLeftbarMobileMenu;
        }
      };
    }, []);

    return (
      <div className={className}>
        {/* Desktop Leftbar */}
        <div className="fixed md:w-[10vw] xl:w-[20vw] 2xl:w-[15vw] h-full w-full max-w-full pt-4 overflow-y-auto hide-scrollbar hidden md:block">
          <div className="flex flex-col justify-between h-full">
            <div
              className="relative border-b xl:border-none px-6 2xl:px-4 border-gray-300 dark:border-slate-600 md:flex-col xl:flex-row flex items-center gap-2 justify-start md:py-4 md:pb-8 xl:py-2"
              style={{ width: "inherit" }}>
              <div className="text-gray-800 dark:text-white text-5xl md:text-5xl lg:text-7xl xl:text-8xl cursor-pointer flex items-center justify-center 2xl:text-8xl">
                <Link href="/">BH</Link>
              </div>
            </div>
            <div
              className="flex flex-col w-full h-full overflow-x-visible overflow-y-auto p-2"
              style={{ width: "inherit" }}>
              {OPTIONS.map(({ logo, text, href }, key) => {
                return (
                  <Link
                    href={href}
                    target={key === 0 ? "" : "_blank"}
                    key={key}
                    className="group">
                    <div
                      key={text[locale]}
                      className="py-4 px-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start md:justify-center xl:justify-start items-center gap-4">
                      <div className="transition-transform transform group-hover:scale-110 text-2xl lg:text-3xl xl:text-4xl">
                        {logo}
                      </div>
                      <p className="text-lg transition-transform uppercase transform md:hidden xl:block">
                        {text[locale]}
                      </p>
                    </div>
                  </Link>
                );
              })}
              <LanguageSelect
                locale={locale}
                isOpen={dropdownOption}></LanguageSelect>
              <ThemeSelect locale={locale} />
              <SocialsSelect locale={locale} />
            </div>
            <div ref={containerRef}>
              {options && <AuthOptions setOptions={setOptions}></AuthOptions>}
              <UserSession
                toggleOptions={() => setOptions(!options)}></UserSession>
            </div>
          </div>
        </div>

        {/* Mobile Leftbar - Using AnimatePresence for animations */}
        <div className="md:hidden">
          {/* Backdrop with Blur */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMobileMenu}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999998]"
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
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
                className="max-h-full fixed pr-0 z-[9999999] top-0 left-0 right-20 bottom-0 max-w-[60%] sm:max-w-[50%] bg-gray-100 dark:bg-slate-700">
                <div className="h-full flex flex-row">
                  <div className="flex flex-col justify-between h-full w-full">
                    <div className="px-4 border-b border-gray-300 dark:border-slate-600 flex items-center gap-2 justify-between py-4">
                      <span className="dark:text-white text-5xl cursor-pointer py-2 flex flex-row justify-between items-center w-full">
                        <div className="text-gray-800 dark:text-white flex items-center justify-center">
                          <Link
                            href="/"
                            className="text-5xl cursor-pointer"
                            onClick={closeMobileMenu}>
                            BH
                          </Link>
                        </div>
                        <RxCrossCircled
                          className="text-xl text-gray-800 dark:text-white cursor-pointer"
                          onClick={closeMobileMenu}
                        />
                      </span>
                    </div>

                    <div className="flex flex-col h-full overflow-auto">
                      <div className="flex flex-col w-full h-full">
                        {OPTIONS.map(({ logo, text, href }, key) => (
                          <Link href={href} key={key} onClick={closeMobileMenu}>
                            <div className="py-3 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start items-center gap-4 px-4">
                              <div className="text-xl">{logo}</div>
                              <p>{text[locale]}</p>
                            </div>
                          </Link>
                        ))}
                        <LanguageSelect
                          locale={locale}
                          isOpen={dropdownOption}
                        />
                        <ThemeSelect locale={locale} />
                        <SocialsSelect locale={locale} />
                      </div>
                    </div>

                    <div className="mt-auto">
                      {options && (
                        <AuthOptions setOptions={setOptions}></AuthOptions>
                      )}
                      <UserSession
                        toggleOptions={() =>
                          setOptions(!options)
                        }></UserSession>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

Leftbar.displayName = "Leftbar";

export default Leftbar;
