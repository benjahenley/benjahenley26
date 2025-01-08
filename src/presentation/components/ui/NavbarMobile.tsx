"use client";

import { FC, useEffect, useRef, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";
import { LeftbarMobile } from "./leftbar/mobile";
import { Locales } from "@/infraestructure/interfaces";

type Props = {
  className?: string;
  // setMenu: () => void;
  locale: Locales;
};

const NavbarMobile: FC<Props> = ({ className, locale }) => {
  const [menu, setMenu] = useState(false);
  const [trends, setTrends] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    if (menu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  return (
    <div className={className}>
      <div ref={menuRef}>
        <LeftbarMobile
          handleClose={() => setMenu(false)}
          locale={locale}
          className={`${!menu && "hidden"}`}
        />
      </div>
      <div className="h-20 md:hidden"></div>
      <div className="fixed md:hidden bottom-0 w-full h-16 bg-custom-gradient">
        <div className="w-full h-full flex justify-between items-center text-white px-2">
          <div
            className="flex items-center justify-left text-4xl"
            onClick={() => setMenu(!menu)}>
            <HiOutlineMenu className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-center relative">
            <text
              className="relative z-10 text-4xl font-bold"
              style={{
                fontFamily: "Helvetica, sans-serif",
                lineHeight: "normal",
              }}>
              BH
            </text>
          </div>

          <div className="text-4xl flex items-center justify-end mr-2">
            <FiTrendingUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
