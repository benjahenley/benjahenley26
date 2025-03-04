"use client";
import { userSession } from "@/atoms/session";
import { toggleLike } from "@/utils/interactions";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

type InteractionProps = {
  projectId: number;
  initialCount: number;
  authenticate: () => void;
};

export function RepostButton({
  projectId,
  initialCount,
  authenticate,
}: InteractionProps) {
  const [shared, setShared] = useState(false);
  const [count, setCount] = useState(initialCount);
  const userAtom = useAtomValue(userSession);

  if (!userAtom) {
    authenticate();

    return;
  }

  const handleShare = async () => {
    try {
      // const data = await repostProject(projectId, userAtom.userId);
      // if (data.like) {
      //   setCount(count + 1);
      // } else {
      //   setCount(count - 1);
      // }
      setShared(!shared);
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  return (
    <li
      className="flex items-center gap-1 cursor-pointer"
      onClick={handleShare}>
      <p className="p-2 rounded-full hover:bg-pink-100">
        {shared ? (
          <FiShare className="text-[rgba(255,215,0,0.2)]" />
        ) : (
          <FiShare />
        )}
      </p>
      <span>{count}</span>
    </li>
  );
}
export default RepostButton;
