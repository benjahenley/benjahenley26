"use client";
import { userSession } from "@/atoms/session";
import { toggleLike } from "@/utils/interactions";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useModal } from "../../../modals/context";

type InteractionProps = {
  projectId: number;
  likeCount: number;
};

export function LikeButton({ projectId, likeCount }: InteractionProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likeCount);
  const userAtom = useAtomValue(userSession);
  const modal = useModal();

  const handleLike = async () => {
    try {
      if (!userAtom.userId) {
        return modal.openModal("SIGN_IN");
      }

      const data = await toggleLike(projectId, userAtom.userId);

      if (data.like) {
        setCount(count + 1);
      } else {
        setCount(count - 1);
      }

      setLiked(data.like);
    } catch (err: any) {
      // todo: status of the api call when user not logged in: return unauthorized error code
      console.error("Error toggling like", err);
    }
  };

  useEffect(() => {
    setCount(likeCount);
  }, []);

  return (
    <li className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
      <p className="p-2 rounded-full hover:bg-pink-100">
        {liked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
      </p>
      <span>{count}</span>
    </li>
  );
}
export default LikeButton;
