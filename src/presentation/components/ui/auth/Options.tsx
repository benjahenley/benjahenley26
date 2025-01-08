"use client";

import { useEffect, useRef } from "react";
import { useModal } from "../../modals/context";
import { useAtom } from "jotai";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { optionsAtom } from "@/atoms/options";

type Props = {
  className?: string;
};

export default function Options({ className }: Props) {
  const { openModal } = useModal();
  const [options, setOptions] = useAtom(optionsAtom);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close component when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOptions(false);
      }
    }

    if (options) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [options, setOptions]);

  if (!options) {
    return null; // Don't render the component if options is false
  }

  return (
    <div
      ref={containerRef}
      className={`${className} border-t border-gray-300 dark:border-slate-700 w-full`}>
      <div className="flex flex-col text-left text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOptions(false);
            openModal("SIGN_IN");
          }}
          className="hover:font-black group px-7 py-2 font-bold hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-white flex items-center justify-center xl:justify-between">
          <p className="hidden xl:block">Sign In</p>
          <FaSignInAlt className="text-lg group-hover:scale-110" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal("SIGN_UP");
          }}
          className="hover:font-black group px-7 py-2 font-bold hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-white flex items-center justify-center xl:justify-between">
          <p className="hidden xl:block">Sign Up</p>
          <FaUserPlus className="text-lg group-hover:scale-110" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOptions(false); // Close options on sign-out
          }}
          className="hover:font-black group px-7 py-2 font-bold hover:bg-gray-300 dark:hover:bg-slate-700 text-red-600 flex items-center justify-center xl:justify-between">
          <p className="hidden xl:block">Sign Out</p>
          <FaSignOutAlt className="text-lg group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}
