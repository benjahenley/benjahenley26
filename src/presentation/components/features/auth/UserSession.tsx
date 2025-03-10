"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { TweetNameTitle, TwitterHandle } from "../../shared/ui/Texts";
import SessionProfilePic from "../profile/SessionProfilePic";
import { useAtom } from "jotai";
import { userSession } from "@/atoms/session";
import { accessTokenAtom } from "@/atoms/auth";

function UserSession({
  className,
  toggleOptions,
}: {
  className?: string;
  toggleOptions: () => void;
}) {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [userData, setUserData] = useAtom(userSession);

  return (
    <div className={"w-full relative " + className} onClick={toggleOptions}>
      <div className="border-t border-gray-300 dark:border-slate-600 ">
        <div className="flex flex-col items-start dark:text-white md:py-0 px-2 ">
          <div className="cursor-pointer w-full h-auto hover:bg-gray-100 hover:dark:bg-gray-700 rounded-full md:px-4 md:py-4 lg:py-1 flex flex-row justify-between md:justify-center xl:justify-between items-center my-2">
            {/* User Session */}
            <div className="flex flex-row items-center">
              <SessionProfilePic
                small={true}
                className=" text-gray-800 dark:text-gray-200"
              />
              <div className="p-2 md:hidden xl:block pl-4">
                <TweetNameTitle className="text-gray-800 dark:text-gray-200 text-sm font-bold cursor-pointer line-clamp-1">
                  {accessToken
                    ? userData.userFirstName + " " + userData.userLastName
                    : "Unauthenticated"}
                </TweetNameTitle>
                <TwitterHandle className="">
                  {accessToken
                    ? "@" + userData.handle
                    : "Sign in / Create account"}
                </TwitterHandle>
              </div>
            </div>

            {/* Dots Icon */}
            <div className="md:hidden xl:block p-1 rounded-full dark:hover:bg-slate-800 hover:bg-slate-200 cursor-pointer">
              <RxDotsHorizontal
                className="text-xl text-gray-800 dark:text-gray-200"
                onClick={() => toggleOptions()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSession;
