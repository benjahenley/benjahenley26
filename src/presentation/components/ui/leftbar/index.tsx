"use client";

import Link from "next/link";
import { Locales } from "@/infraestructure/interfaces";
import getOptions from "@/infraestructure/data/MenuOptions";
import Options from "@/presentation/components/features/auth/AuthOptions";
import UserSession from "@/presentation/components/features/auth/UserSession";
import { LanguageSelect } from "../../shared/ui/dropdowns/Language";
import ThemeSelect from "../../shared/ui/dropdowns/Theme";
import { HiOutlineMenu } from "react-icons/hi";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaSpotify,
} from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/atoms/darkmode";
import { contents } from "@/data/contents/content";
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
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    // Measure the panel content so that, when closed, the whole thing sits
    // translated down with only the bar peeking at the bottom of the screen.
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [barReady, setBarReady] = useState(false);
    // Once the user has toggled, animate with a spring; before that the bar
    // just snaps to its closed position (no slide on first load).
    const [interacted, setInteracted] = useState(false);

    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

    const SOCIALS = [
      {
        name: "LinkedIn",
        icon: <FaLinkedin />,
        href: "https://www.linkedin.com/in/benjamin-h-579b88146/",
      },
      {
        name: "Github",
        icon: <FaGithub />,
        href: "https://github.com/benjahenley",
      },
      {
        name: "Instagram",
        icon: <FaInstagram />,
        href: "https://www.instagram.com/benjahenley/",
      },
      {
        name: "Whatsapp",
        icon: <FaWhatsapp />,
        href: "https://wa.link/6qupmc",
      },
      {
        name: "Music",
        icon: <FaSpotify />,
        href: "https://open.spotify.com/artist/6BzP9m9BqegCaCajUA4IEg",
      },
    ];

    const LANGUAGES = [
      { code: "es", flag: "🇦🇷" },
      { code: "en", flag: "🇬🇧" },
    ];

    const changeLanguage = (newLocale: Locales) => {
      if (newLocale === locale) return;
      const url = window.location.pathname.split("/").slice(2).join("/");
      router.push(`/${newLocale}/${url}`);
    };

    const setTheme = (dark: boolean) => {
      setIsDarkMode(dark);
      document.documentElement.classList.toggle("dark", dark);
    };

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

    // Toggle mobile menu
    const toggleMobileMenu = () => {
      setInteracted(true);
      setIsMobileMenuOpen((prev) => !prev);
      setOpenDropdown(null);
    };

    // Close mobile menu
    const closeMobileMenu = () => {
      setInteracted(true);
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    };

    // Measure the panel content height (everything below the bar) so the
    // closed state can translate exactly that far down.
    useEffect(() => {
      const measure = () => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.offsetHeight);
        }
        setBarReady(true);
      };
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }, [openDropdown, options, locale]);

    // Offset the page so content isn't hidden behind the fixed bar (mobile only).
    useEffect(() => {
      const apply = () => {
        // Footer owns the bottom clearance for the fixed mobile bar (see Footer.tsx).
        document.body.style.paddingBottom = "0px";
      };
      apply();
      window.addEventListener("resize", apply);
      return () => {
        window.removeEventListener("resize", apply);
        document.body.style.paddingBottom = "0px";
      };
    }, []);

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
              <div className="cursor-pointer flex items-center justify-center">
                <Link href="/">
                  {/* Small (md): dark logo in light mode */}
                  <img
                    src="https://res.cloudinary.com/dfcfi3ozi/image/upload/v1774301634/Frame_11_2_xn8ofr.png"
                    alt="Benja Henley"
                    className="h-10 w-auto block xl:hidden dark:hidden"
                  />
                  {/* Small (md): white logo in dark mode */}
                  <img
                    src="https://res.cloudinary.com/dfcfi3ozi/image/upload/v1774303693/Frame_11_4_k0s33i.png"
                    alt="Benja Henley"
                    className="h-10 w-auto hidden dark:block xl:dark:hidden"
                  />
                  {/* Large (xl): dark logo in light mode */}
                  <img
                    src="https://res.cloudinary.com/dfcfi3ozi/image/upload/v1774301869/Frame_9_rtvavr.png"
                    alt="Benja Henley"
                    className="h-14 w-auto hidden xl:block xl:dark:hidden"
                  />
                  {/* Large (xl): white logo in dark mode */}
                  <img
                    src="https://res.cloudinary.com/dfcfi3ozi/image/upload/v1774303695/Frame_9_1_skjkbz.png"
                    alt="Benja Henley"
                    className="h-14 w-auto hidden xl:dark:block"
                  />
                </Link>
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
                      className="py-4 px-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200/40 dark:hover:bg-slate-700/30 border-l-2 border-transparent dark:hover:border-green-500/70 hover:border-violet-400/70 transition-all duration-200 cursor-pointer flex flex-row justify-start md:justify-center xl:justify-start items-center gap-4">
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
                isOpen={openDropdown === "idioma"}
                onOpen={() =>
                  setOpenDropdown(openDropdown === "idioma" ? null : "idioma")
                }
              />
              <ThemeSelect
                locale={locale}
                isOpen={openDropdown === "tema"}
                onOpen={() =>
                  setOpenDropdown(openDropdown === "tema" ? null : "tema")
                }
              />
              <SocialsSelect
                locale={locale}
                isOpen={openDropdown === "social"}
                onOpen={() =>
                  setOpenDropdown(openDropdown === "social" ? null : "social")
                }
              />
            </div>
            <div ref={containerRef}>
              {options && <AuthOptions setOptions={setOptions}></AuthOptions>}
              <UserSession
                toggleOptions={() => setOptions(!options)}></UserSession>
            </div>
          </div>
        </div>

        {/* Mobile bottom nav — ONE component: the bar is the top edge, the
            panel slides up out of it. Closed → only the bar peeks at the
            bottom; open → the bar rises and reveals the menu below it. */}
        <div className="md:hidden">
          {/* Backdrop with blur */}
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

          <motion.div
            initial={false}
            animate={{ y: isMobileMenuOpen ? 0 : contentHeight }}
            transition={
              interacted
                ? { type: "spring", stiffness: 260, damping: 30 }
                : { duration: 0 }
            }
            className={`fixed z-[9999999] left-0 right-0 bottom-0 flex flex-col rounded-t-2xl bg-gray-100 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 shadow-[0_-4px_24px_0_rgba(124,58,237,0.10)] ${
              barReady ? "" : "invisible"
            }`}>
            {/* Bar — always visible, the top edge of the whole thing */}
            <div className="rounded-t-2xl bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-600 shrink-0">
              <div className="h-20 px-6 flex justify-between items-center text-gray-800 dark:text-white">
                <Link
                  href={`/${locale}`}
                  onClick={closeMobileMenu}
                  className="text-4xl flex items-center justify-start ml-2 cursor-pointer">
                  <CgProfile />
                </Link>

                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="relative z-10 text-4xl font-bold"
                  style={{
                    fontFamily: "Helvetica, sans-serif",
                    lineHeight: "normal",
                  }}>
                  BH
                </Link>

                <div
                  className="text-4xl flex items-center justify-end cursor-pointer"
                  onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? <RxCrossCircled /> : <HiOutlineMenu />}
                </div>
              </div>
            </div>

            {/* Panel content — sits below the bar, revealed when it rises */}
            <div ref={contentRef} className="overflow-y-auto max-h-[70vh]">
              {/* Language — flags only, neutral selection */}
              <div className="px-5 py-3 flex items-center justify-between gap-4">
                <p className="uppercase text-sm font-medium text-gray-700 dark:text-gray-300">
                  {contents[locale].ui.leftbar.itemsWithDropdown[0]}
                </p>
                <button
                  onClick={() =>
                    changeLanguage((locale === "en" ? "es" : "en") as Locales)
                  }
                  aria-label="Toggle language"
                  className="relative flex items-center w-16 h-8 rounded-full p-1 bg-gray-200 dark:bg-slate-600 transition-colors">
                  {/* Language codes on both sides */}
                  <span className="absolute left-2 text-[10px] font-semibold uppercase text-gray-500 dark:text-gray-300">
                    {LANGUAGES[0].code}
                  </span>
                  <span className="absolute right-2 text-[10px] font-semibold uppercase text-gray-500 dark:text-gray-300">
                    {LANGUAGES[1].code}
                  </span>
                  {/* Sliding knob */}
                  <span
                    className={`relative z-10 w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-[10px] font-bold uppercase text-gray-700 dark:text-gray-200 transition-transform duration-300 ${
                      locale === "en" ? "translate-x-8" : "translate-x-0"
                    }`}>
                    {locale === "en" ? LANGUAGES[1].code : LANGUAGES[0].code}
                  </span>
                </button>
              </div>

              {/* Theme — neutral switch with sun / moon on each side */}
              <div className="px-5 py-3 border-t border-gray-300 dark:border-slate-600 flex items-center justify-between gap-4">
                <p className="uppercase text-sm font-medium text-gray-700 dark:text-gray-300">
                  {contents[locale].ui.leftbar.theme.themeTitle}
                </p>
                <button
                  onClick={() => setTheme(!isDarkMode)}
                  aria-label="Toggle theme"
                  className="relative flex items-center w-16 h-8 rounded-full p-1 bg-gray-200 dark:bg-slate-600 transition-colors">
                  {/* Icons on both sides */}
                  <span className="absolute left-1.5 text-gray-500 dark:text-gray-300 text-sm">
                    <MdOutlineLightMode />
                  </span>
                  <span className="absolute right-1.5 text-gray-500 dark:text-gray-300 text-sm">
                    <MdOutlineDarkMode />
                  </span>
                  {/* Sliding knob */}
                  <span
                    className={`relative z-10 w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-xs text-gray-700 dark:text-gray-200 transition-transform duration-300 ${
                      isDarkMode ? "translate-x-8" : "translate-x-0"
                    }`}>
                    {isDarkMode ? (
                      <MdOutlineDarkMode />
                    ) : (
                      <MdOutlineLightMode />
                    )}
                  </span>
                </button>
              </div>

              {/* Socials — all networks + music, where the session block used to be */}
              <div className="px-5 py-4 border-t border-gray-300 dark:border-slate-600 flex items-center justify-center gap-7">
                {SOCIALS.map(({ name, icon, href }) => (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    aria-label={name}
                    onClick={closeMobileMenu}
                    className="text-2xl text-gray-700 dark:text-gray-200 hover:text-violet-500 dark:hover:text-emerald-400 hover:scale-110 transition-all">
                    {icon}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  },
);

Leftbar.displayName = "Leftbar";

export default Leftbar;
