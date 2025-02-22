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
  const [loading, setLoading] = useState(false); // Prevents double clicks

  const userAtom = useAtomValue(userSession);
  const modal = useModal();

  // Sync likeCount if it changes from props
  useEffect(() => {
    setCount(likeCount);
  }, [likeCount]);

  // Fetch initial liked state when user is logged in
  useEffect(() => {
    const fetchUserLikeStatus = async () => {
      if (!userAtom.userId) return;

      try {
        // const res = await axios.get(`/api/project/${projectId}/isLiked`, {
        //   params: { userId: userAtom.userId },
        // });

        // setLiked(res.data.liked);
        setLiked(!liked);
      } catch (err) {
        console.error("Error fetching like status", err);
      }
    };

    fetchUserLikeStatus();
  }, [userAtom.userId, projectId]);

  const handleLike = async () => {
    if (loading) return; // Prevent double taps

    try {
      if (!userAtom.userId) {
        return modal.openModal("SIGN_IN");
      }

      setLoading(true);

      const data = await toggleLike(projectId, userAtom.userId);

      if (data.like) {
        setCount((prev) => prev + 1);
      } else {
        setCount((prev) => prev - 1);
      }

      setLiked(data.like);
    } catch (err: any) {
      console.error("Error toggling like", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="flex items-center gap-1 cursor-pointer">
      <p className={`p-2 rounded-full hover:bg-pink-100`} onClick={handleLike}>
        {liked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
      </p>
      <span>{count}</span>
    </li>
  );
}

export default LikeButton;
