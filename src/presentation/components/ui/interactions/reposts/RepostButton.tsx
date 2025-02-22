"use client";
import { userSession } from "@/atoms/session";
import { toggleLike } from "@/utils/interactions";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type InteractionProps = {
  projectId: number;
  initialCount: number;
};

export function RepostButton({ projectId, initialCount }: InteractionProps) {
  const [reposted, setReposted] = useState(false);
  const [count, setCount] = useState(initialCount);
  const userAtom = useAtomValue(userSession);

  if (!userAtom) {
    return;
  }

  const handleLike = async () => {
    try {
      // const data = await repostProject(projectId, userAtom.userId);
      // if (data.like) {
      //   setCount(count + 1);
      // } else {
      //   setCount(count - 1);
      // }
      // setReposted(data.like);
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  return (
    <li className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
      <p className="p-2 rounded-full hover:bg-pink-100">
        {reposted ? (
          <AiOutlineRetweet className="text-pink-500" />
        ) : (
          <AiOutlineRetweet />
        )}
      </p>
      <span>{count}</span>
    </li>
  );
}
export default RepostButton;
