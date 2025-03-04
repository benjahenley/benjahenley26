import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userSession } from "@/atoms/session";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/presentation/components/shared/modals/context";
import { FaUserCircle } from "react-icons/fa";
import { IoHeart, IoHeartOutline, IoEllipsisHorizontal } from "react-icons/io5";
import ProjectCommentInput from "../../shared/ui/interactions/comments/ProjectCommentInput";
import { IoMdArrowBack } from "react-icons/io";
import ProjectComment from "./ProjectComment";

type Props = {
  projectId: number;
  comments: any[];
  handleGoBack?: () => void;
  handlePreviousProject?: () => void;
  handleNextProject?: () => void;
};

export function ProjectComments({
  projectId,
  comments,
  handleGoBack,
  handlePreviousProject,
  handleNextProject,
}: Props) {
  const [session] = useAtom(userSession);

  // Default comments for each project
  const defaultComments = [
    {
      id: 0,
      content:
        "This project looks amazing! I love the tech stack you used. How long did it take to build?",
      user: {
        name: "Tony Stark",
        handle: "@ironman",
      },
      createdAt: new Date(),
    },
    {
      id: 1,
      content: "The UI is so clean and modern. Great job on the design!",
      user: {
        name: "Steve Rogers",
        handle: "@captain",
      },
      createdAt: new Date(),
    },
  ];

  const showComments = comments?.length > 0 ? comments : defaultComments;

  return (
    <div className="comments-section flex flex-col h-full">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm p-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-200">
            <IoMdArrowBack className="text-xl" />
            <span className="text-sm font-medium">Projects</span>
          </button>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Comments
          </h2>
          <div className=" items-center gap-6 hidden">
            <button
              onClick={handlePreviousProject}
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-200">
              <IoMdArrowBack className="text-xl transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium hidden md:inline">
                Previous
              </span>
            </button>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <button
              onClick={handleNextProject}
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-200">
              <span className="text-sm font-medium hidden md:inline">Next</span>
              <IoMdArrowBack className="text-xl transform rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div
        className="flex-grow overflow-y-auto p-3 space-y-4 relative"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: "fixed",
          minHeight: "300px",
          maxHeight: "calc(100vh - 180px)",
        }}>
        <AnimatePresence>
          {showComments.map((comment: any, index: number) => (
            <ProjectComment
              key={index}
              comment={comment}
              session={session}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Fixed input at the bottom */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <ProjectCommentInput projectId={projectId} />
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
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
