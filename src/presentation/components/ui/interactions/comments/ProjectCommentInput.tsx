import { useState } from "react";
import { useAtom } from "jotai";
import { userSession } from "@/atoms/session";
import { FaPaperPlane, FaSmile, FaUserCircle } from "react-icons/fa";
import { IoAttach } from "react-icons/io5";
import { useModal } from "@/presentation/components/modals/context";

type Props = {
  projectId: number;
};

export function ProjectCommentInput({ projectId }: Props) {
  const [newComment, setNewComment] = useState("");
  const [session] = useAtom(userSession);
  const { openModal } = useModal();
  const isLoggedIn = Boolean(session.userName) && Boolean(session.twitterTag);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === "") return;

    if (!isLoggedIn) {
      // Open sign-in modal if not logged in
      openModal("SIGN_IN");
      return;
    }

    console.log(`New comment for project ${projectId}: ${newComment}`);
    // Add comment to the project
    // This would typically call an API

    setNewComment("");
  };

  return (
    <div className="w-full mx-auto p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <FaUserCircle className="text-gray-600 w-10 h-10" />
          </div>
        </div>

        {/* Input field with borders and styling to look like chat input */}
        <div className="flex-1 relative">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden bg-white dark:bg-gray-700">
            <input
              type="text"
              placeholder={
                isLoggedIn
                  ? `Comment as ${session.userName || session.twitterTag}...`
                  : "Sign in to comment..."
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow w-full rounded-full py-3 px-4 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Send button */}
        <button
          type="submit"
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition flex items-center justify-center shadow-md">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default ProjectCommentInput;
