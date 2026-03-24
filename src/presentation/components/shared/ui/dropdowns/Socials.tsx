"use client";

import { Locales } from "@/infraestructure/interfaces/locales";
import { FC, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import Link from "next/link";
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

export const SocialsSelect: FC<Props> = ({ locale, isOpen, onOpen }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
    { name: "Whatsapp", icon: <FaWhatsapp />, href: "https://wa.link/6qupmc" },
  ];

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

  // For mobile view - inline dropdown
  const MobileDropdown = () => (
    <div className="h-full overflow-x-hidden w-full">
      <ul className="w-full" role="none" onClick={() => onOpen && onOpen()}>
        {SOCIALS.map(({ name, icon, href }) => (
          <li className="w-full" key={name}>
            <Link className="w-full" href={href} target="_blank">
              <div className="px-4 py-2 lg:px-[22px] lg:rounded-lg w-full dark:text-white dark:hover:bg-slate-700/30 border-l-2 border-transparent hover:border-violet-500 dark:hover:border-emerald-400 transition-all duration-200 cursor-pointer flex flex-row justify-start md:justify-center xl:justify-between items-center gap-4">
                <div className="flex flex-row justify-center items-center gap-5 lg:gap-6">
                  <div className="text-sm lg:text-xl xl:text-2xl grayscale hover:grayscale-0 text-gray-800 dark:text-white dark:hover:text-emerald-400 hover:text-violet-500">
                    {icon}
                  </div>
                  <p className="md:hidden xl:block text-sm md:text-base text-gray-800 dark:text-white">
                    {name}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col items-start relative w-full">
      <button
        ref={buttonRef}
        style={{ width: "inherit" }}
        onClick={onOpen}
        className="group px-4 py-3 md:py-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200/40 dark:hover:bg-slate-700/30 border-l-2 border-transparent hover:border-violet-400/70 dark:hover:border-green-500/70 transition-all duration-200 cursor-pointer flex flex-row justify-between md:justify-center xl:justify-between items-center w-full">
        <div className="flex flex-row items-center gap-4">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl transition-transform transform group-hover:scale-110 text-gray-800 dark:text-white">
            <GrShareOption />
          </div>
          <p className="uppercase text-md md:hidden xl:block xl:text-lg transition-transform transform">
            Social
          </p>
        </div>
        <MdKeyboardArrowDown
          className={`text-2xl md:hidden xl:block transform transition-transform ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {/* Desktop dropdown with portal - Only render on non-mobile screens */}
      {!isMobile && isOpen && (
        <DropdownPortal isOpen={isOpen} triggerRef={buttonRef} onClose={onOpen}>
          <ul className="w-48" role="none">
            {SOCIALS.map(({ name, icon, href }) => (
              <li className="w-full" key={name}>
                <Link href={href} target="_blank" className="w-full">
                  <div className="px-4 py-2 w-full dark:text-white hover:bg-gray-100/30 dark:hover:bg-slate-700/30 border-l-2 border-transparent hover:border-violet-500 dark:hover:border-emerald-400 transition-all duration-200 cursor-pointer flex flex-row items-center gap-4">
                    <div className="text-xl grayscale hover:grayscale-0 text-gray-800 dark:text-white hover:text-violet-500 dark:hover:text-emerald-400">
                      {icon}
                    </div>
                    <p className="text-gray-800 dark:text-white">{name}</p>
                  </div>
                </Link>
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
