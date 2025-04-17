"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProfilePic from "./MyProfilePic";
import {
  FaMinus,
  FaPlus,
  FaUserAlt,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import { useAtom } from "jotai";
import {
  isFollowingAtom,
  followersCountAtom,
  followingCountAtom,
} from "@/atoms/following";

type Props = {
  userTag: string;
  userName: string;
};

export function UserStatsExpandable({ userTag, userName }: Props) {
  const [hovered, setHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useAtom(isFollowingAtom);
  const [followersCount] = useAtom(followersCountAtom);
  const [followingCount] = useAtom(followingCountAtom);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div
      className="flex items-center justify-center gap-0 md:gap-2 bg-white dark:bg-gray-800 w-fit rounded-full py-1 pl-2 pr-4 max-w-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <ProfilePic small className="cursor-pointer p-1 md:pl-2 " />
      <div className="flex flex-col gap-0 pl-2 h-fit">
        <h5
          style={{ lineHeight: "1.2" }}
          className={`text-md font-bold text-gray-800 dark:text-white  ${
            hovered ? "hidden md:flex pr-2" : "pr-4"
          } `}>
          {userName}
        </h5>
        <p
          className={`text-xs text-gray-700 dark:text-white opacity-70 ${
            hovered && "hidden"
          }`}>
          {userTag}
        </p>
      </div>
      {/* Motion div for sliding stats */}
      {hovered && (
        <motion.div
          className=""
          initial="hidden"
          animate="visible"
          variants={containerVariants}>
          <div className="flex items-center gap-4 ">
            {/* Followers */}
            <motion.div
              className="flex items-center gap-1 group"
              variants={itemVariants}>
              <FaUserFriends className="text-gray-700 dark:text-white text-lg group-hover:scale-105" />
              <span className="text-sm text-gray-700 dark:text-white group-hover:scale-105">
                {followersCount}
              </span>
            </motion.div>
            {/* Following */}
            <motion.div
              className="flex items-center gap-1 group"
              variants={itemVariants}>
              <FaUserAlt className="text-gray-700 dark:text-white text-sm group-hover:scale-105" />
              <span className="text-sm text-gray-700 dark:text-white group-hover:scale-105">
                {followingCount}
              </span>
            </motion.div>
            {/* Follow Button */}
            <motion.button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`${
                !isFollowing
                  ? "bg-purple-700 dark:bg-emerald-700"
                  : "bg-gray-400 dark:bg-gray-600"
              } text-white text-sm px-2 rounded-full flex flex-row items-center gap-1 group`}
              variants={itemVariants}>
              {isFollowing ? "Following" : "Follow"}

              {!isFollowing ? (
                <FaPlus className="text-sm bg-purple-500 dark:bg-emerald-500 rounded-full p-[2px] group-hover:rotate-180 duration-300"></FaPlus>
              ) : (
                <FaMinus className="text-sm p-[2px] bg-gray-500 dark:bg-gray-500 rounded-full group-hover:rotate-180 duration-300"></FaMinus>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UserStatsExpandable;
