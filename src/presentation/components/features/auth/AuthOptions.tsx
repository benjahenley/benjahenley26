"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "../../shared/modals/context";
import { useAtom } from "jotai";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { accessTokenAtom } from "@/atoms/auth";

type Props = {
  className?: string;
  setOptions: (options: boolean) => void;
};

export default function AuthOptions({ className, setOptions }: Props) {
  const { openModal } = useModal();
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  return (
    <div
      className={`${className} border-t border-gray-300 dark:border-slate-700 w-full`}>
      <div className="flex flex-col text-left text-sm">
        {!accessToken ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOptions(false);
                openModal("SIGN_IN");
              }}
              className="hover:font-black group px-5 xl:px-7 py-2 h-10 font-bold hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-white flex flex-row items-center justify-between md:justify-center xl:justify-between">
              <p className="flex md:hidden xl:block">Sign In</p>
              <FaSignInAlt className="text-lg group-hover:scale-110" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOptions(false);
                openModal("SIGN_UP");
              }}
              className="hover:font-black group px-5 xl:px-7 py-2 h-10 font-bold hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-white flex items-center justify-between md:justify-center xl:justify-between">
              <p className="flex md:hidden xl:block">Sign Up</p>
              <FaUserPlus className="text-lg group-hover:scale-110" />
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOptions(false);
              openModal("LOG_OUT");
            }}
            className="hover:font-black group px-5 xl:px-7 py-2 font-bold hover:bg-gray-300 dark:hover:bg-slate-700 text-red-600 flex items-center justify-between md:justify-center xl:justify-between">
            <p className="flex md:hidden xl:block">Sign Out</p>
            <FaSignOutAlt className="text-lg group-hover:scale-110" />
          </button>
        )}
      </div>
    </div>
  );
}
