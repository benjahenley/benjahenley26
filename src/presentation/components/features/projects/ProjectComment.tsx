import { toggleLike } from "@/utils/interactions";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { IoHeart, IoHeartOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { useState } from "react";

type Props = {
  comment: any;
  session: any;
  index: number;
};

export default function ProjectComment({ comment, session, index }: Props) {
  const [hoveredComment, setHoveredComment] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  const toggleLike = (commentId: number) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 50,
        delay: index * 0.1,
      }}
      className={`flex ${
        comment.user?.handle === session.twitterTag
          ? "justify-end"
          : "justify-start"
      } w-full`}
      onMouseEnter={() => setHoveredComment(comment.id)}
      onMouseLeave={() => setHoveredComment(null)}>
      <div
        className={`flex items-end gap-2 max-w-[80%] group ${
          comment.user?.handle === session.twitterTag
            ? "flex-row-reverse"
            : "flex-row"
        }`}>
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <FaUserCircle className="text-gray-600 w-8 h-8" />
          </div>
        </div>

        <div
          className={`relative p-3 rounded-2xl shadow-md 
        ${
          comment.user?.handle === session.twitterTag
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
        }
        transform transition-all duration-300 hover:scale-[1.01] animate-float
      `}>
          <div className="font-semibold text-xs mb-1">
            {comment.user?.name || "User"}
            <span className="ml-1 opacity-70 text-xs">
              {comment.user?.handle || "@username"}
            </span>
          </div>

          <p className="text-sm break-words">{comment.content}</p>

          <div className="text-[10px] opacity-70 text-right mt-1">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "12:00 PM"}
          </div>

          <AnimatePresence>
            {hoveredComment === comment.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute ${
                  comment.user?.handle === session.twitterTag
                    ? "-left-12"
                    : "-right-12"
                } bottom-0 flex gap-1`}>
                <button
                  onClick={() => toggleLike(comment.id)}
                  className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  {likedComments[comment.id] ? (
                    <IoHeart className="text-red-500 w-4 h-4" />
                  ) : (
                    <IoHeartOutline className="text-gray-600 dark:text-gray-300 w-4 h-4" />
                  )}
                </button>
                <button className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <IoEllipsisHorizontal className="text-gray-600 dark:text-gray-300 w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
