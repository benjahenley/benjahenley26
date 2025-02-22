"use client";
import { userSession } from "@/atoms/session";
import { toggleLike } from "@/utils/interactions";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";

type InteractionProps = {
  projectId: number;
  initialCount: number;
  authenticate: () => void;
};

export function BookmarkButton({
  projectId,
  initialCount,
  authenticate,
}: InteractionProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const userAtom = useAtomValue(userSession);

  if (!userAtom) {
    authenticate();

    return;
  }

  const handleBookmarkPress = async () => {
    try {
      // const data = await repostProject(projectId, userAtom.userId);
      // if (data.like) {
      //   setCount(count + 1);
      // } else {
      //   setCount(count - 1);
      // }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  return (
    <li
      className="flex items-center gap-1 cursor-pointer"
      onClick={handleBookmarkPress}>
      <p className="p-2 rounded-full hover:bg-pink-100">
        {bookmarked ? (
          <FaRegBookmark className="text-pink-500" />
        ) : (
          <FaBookmark />
        )}
      </p>
      <span>{count}</span>
    </li>
  );
}
export default BookmarkButton;
