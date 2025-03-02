import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userSession } from "@/atoms/session";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/presentation/components/modals/context";
import { FaUserCircle } from "react-icons/fa";
import { IoHeart, IoHeartOutline, IoEllipsisHorizontal } from "react-icons/io5";
import ProjectCommentInput from "./ProjectCommentInput";

type Props = {
  projectId: number;
  comments: any[];
};

export function ProjectComments({ projectId, comments }: Props) {
  const [session] = useAtom(userSession);
  const { openModal } = useModal();
  const [hoveredComment, setHoveredComment] = useState<number | null>(null);
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {}
  );

  // Example comment for demo purposes if there are no comments
  const demoComment = {
    id: 0,
    content:
      "This project looks amazing! I love the tech stack you used. How long did it take to build?",
    user: {
      name: "Tony Stark",
      handle: "@ironman",
    },
    createdAt: new Date(),
  };

  const showComments = comments?.length > 0 ? comments : [demoComment];

  const toggleLike = (commentId: number) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="comments-section flex flex-col h-full">
      {/* Chat-like background with pattern */}
      <div
        className="flex-grow overflow-y-auto p-3 space-y-4 relative"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: "fixed",
          minHeight: "300px",
          maxHeight: "500px",
        }}>
        <AnimatePresence>
          {showComments.map((comment: any, index: number) => (
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
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <FaUserCircle className="text-gray-600 w-8 h-8" />
                  </div>
                </div>

                {/* Message bubble */}
                <div
                  className={`relative p-3 rounded-2xl shadow-md 
                    ${
                      comment.user?.handle === session.twitterTag
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
                    }
                    transform transition-all duration-300 hover:scale-[1.01] animate-float
                  `}>
                  {/* Username */}
                  <div className="font-semibold text-xs mb-1">
                    {comment.user?.name || "User"}
                    <span className="ml-1 opacity-70 text-xs">
                      {comment.user?.handle || "@username"}
                    </span>
                  </div>

                  {/* Message content */}
                  <p className="text-sm break-words">{comment.content}</p>

                  {/* Time */}
                  <div className="text-[10px] opacity-70 text-right mt-1">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "12:00 PM"}
                  </div>

                  {/* Interaction buttons (appear on hover) */}
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
          ))}
        </AnimatePresence>
      </div>

      {/* Fixed input at the bottom */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <ProjectCommentInput projectId={projectId} />
      </div>

      {/* Animation keyframes for floating effect */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default ProjectComments;
