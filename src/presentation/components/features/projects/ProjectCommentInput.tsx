import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useAtom } from "jotai";
import { userSession } from "@/atoms/session";
import { motion } from "framer-motion";

type ProjectCommentInputProps = {
  projectId: number;
  onSubmit: (comment: string) => void;
  isSubmitting?: boolean;
};

const ProjectCommentInput: React.FC<ProjectCommentInputProps> = ({
  projectId,
  onSubmit,
  isSubmitting = false,
}) => {
  const [comment, setComment] = useState("");
  const [session] = useAtom(userSession);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!comment.trim() || isSubmitting) return;

    onSubmit(comment.trim());
    setComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  // Reset textarea height when comment is sent
  useEffect(() => {
    if (comment === "" && inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  }, [comment]);

  return (
    <div className="flex items-end gap-2 p-3">
      <div className="flex-shrink-0">
        {session.profileImg ? (
          <img
            src={session.profileImg}
            alt={session.userFirstName || "User"}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-8 h-8 text-gray-400" />
        )}
      </div>

      <div className="relative flex-grow bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 pr-12 transition-all">
        <textarea
          ref={inputRef}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            adjustTextareaHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment..."
          className="w-full bg-transparent border-0 focus:ring-0 resize-none py-2 px-3 text-sm text-gray-800 dark:text-white placeholder-gray-500 max-h-[120px] min-h-[36px]"
          style={{ height: "36px" }}
          disabled={isSubmitting}
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={!comment.trim() || isSubmitting}
          className={`absolute right-2 bottom-2 p-1.5 rounded-full ${
            comment.trim() && !isSubmitting
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          } transition-colors`}
          aria-label="Send comment">
          <IoSend className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectCommentInput;
