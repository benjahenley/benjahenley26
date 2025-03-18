import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";

type CommentProps = {
  comment: any;
  session: any;
  index: number;
  isNew?: boolean;
};

const ProjectComment: React.FC<CommentProps> = ({
  comment,
  session,
  index,
  isNew = false,
}) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(comment.likeCount || 0);

  // Check if comment is from current user
  const isCurrentUser =
    comment.isCurrentUser ||
    (session.userId && comment.userId === session.userId) ||
    (session.userEmail && comment.user?.email === session.userEmail) ||
    (session.handle && comment.user?.handle === `@${session.handle}`);

  // Format the timestamp
  const formattedTime = comment.createdAt
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
    : "just now";

  const handleLike = () => {
    if (!session.isLoggedIn) return;
    setLiked(!liked);
    setLikeCount((prev: number) => (liked ? prev - 1 : prev + 1));
  };

  // Animation variants
  const commentVariants = {
    initial: isNew
      ? {
          opacity: 0,
          y: 20,
          x: isCurrentUser ? 20 : -20,
          scale: 0.8,
        }
      : { opacity: 1 },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={commentVariants}
      className={`my-2 ${
        isCurrentUser ? "flex justify-end" : "flex justify-start"
      }`}>
      <div
        className={`
          relative max-w-[85%] md:max-w-[70%] p-3 rounded-lg shadow-sm bg-slate-100 dark:bg-gray-900
          ${
            isCurrentUser
              ? " text-white rounded-tr-none"
              : " text-gray-800 dark:text-white rounded-tl-none"
          }
        `}>
        {/* User info - only show for non-current user */}
        {!isCurrentUser && (
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex flex-row items-center">
              <div className="mr-2">
                {comment.user?.avatar ? (
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </div>
              <span className="font-semibold text-sm">
                {comment.user?.name || "Anonymous"}
              </span>
              {/* Time and like info */}
            </div>
            <div
              className={`flex items-center justify-between mt-1 text-xs  ${
                isCurrentUser
                  ? "text-emerald-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
              <span>{formattedTime}</span>

              <div className="flex items-center"></div>
            </div>
          </div>
        )}

        {/* Comment content */}
        <p className="text-sm whitespace-pre-wrap break-words">
          {comment.content}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectComment;
