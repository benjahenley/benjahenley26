"use client";

import { Locales } from "@/infraestructure/interfaces/locales";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoLanguage } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import Link from "next/link";

type Props = {
  locale: Locales;
};

export const SocialsSelect: FC<Props> = ({ locale }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col items-start relative group w-full`}>
      <button
        style={{ width: "inherit" }}
        onClick={() => setDropdown(!dropdown)}
        className="px-4 py-3 md:py-4 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-between md:justify-center xl:justify-between items-center w-full">
        <div className="flex flex-row items-center gap-4 ">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl transition-transform transform group-hover:scale-110">
            <GrShareOption />
          </div>
          <p className=" uppercase text-md md:hidden xl:block xl:text-lg transition-transform transform ">
            Social
          </p>
        </div>
        <MdKeyboardArrowDown
          className={`text-2xl md:hidden xl:block transform transition-transform ${
            dropdown ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {dropdown && (
        <div className="h-full overflow-x-hidden w-full">
          <ul className="w-full" role="none" onClick={() => setDropdown(false)}>
            {SOCIALS.map(({ name, icon, href }) => (
              <li className="w-full" key={name}>
                <Link className="w-full" href={href}>
                  <div
                    className={`px-4 py-2 lg:px-[22px] lg:rounded-lg w-full dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start md:justify-center xl:justify-between items-center gap-4 md:gap-6`}>
                    <div className="flex flex-row justify-center items-center gap-5 lg:gap-6 ">
                      <div className="text-sm lg:text-xl xl:text-2xl grayscale dark:grayscale text-gray-800 dark:text-white">
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
      )}
    </div>
  );
};
