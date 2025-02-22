import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

type Props = {
  projectId: number;
};

export function ProjectCommentInput({ projectId }: Props) {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === "") return;

    console.log(`New comment for project ${projectId}: ${newComment}`);

    setNewComment("");
  };

  return (
    <div className="w-full mx-auto p-4 hover:bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
      {/* Comment Input */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center gap-2 mb-2 mt-2">
        <input
          type="text"
          placeholder="Say something nasty... (jk please be gentle)"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 dark:border-red-600 transition text-gray-800 dark:text-white dark:bg-gray-700 shadow-md placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition flex items-center justify-center shadow-lg">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default ProjectCommentInput;
