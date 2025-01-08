"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { TweetNameTitle } from "../Texts";
import SessionProfilePic from "../SessionProfilePic";
import { useAtom } from "jotai";
import { optionsAtom } from "@/atoms/options";

function TwitterSession() {
  const [options, setOptions] = useAtom(optionsAtom);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOptions(true);
  };

  return (
    <div
      className="w-full relative"
      ref={containerRef}
      onClick={handleDotsClick}>
      <div className="border-t border-gray-300 dark:border-slate-600">
        <div className="flex flex-col items-start dark:text-white md:py-0 px-2">
          <div className="w-full h-auto hover:bg-gray-100 hover:dark:bg-gray-700 rounded-full px-4  py-1 flex flex-row justify-between md:justify-center xl:justify-between items-center my-2">
            <div className="flex flex-row items-center pl-2 md:pl-0 xl:pl-0 ">
              <SessionProfilePic small={true} className="cursor-pointer" />
              <div className="p-2 md:hidden xl:block">
                <TweetNameTitle className="text-sm font-bold cursor-pointer line-clamp-1">
                  Benja Henley
                </TweetNameTitle>
                <p className="text-sm dark:text-gray-500 cursor-pointer">
                  @benja_dev
                </p>
              </div>
            </div>

            {/* Dots Icon */}
            <div className="md:hidden xl:block p-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer">
              <RxDotsHorizontal className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwitterSession;
