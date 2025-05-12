import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { Locales, TweetApiResponse } from "@/infraestructure/interfaces";
import Image from "next/image";
import {
  FaRegComment,
  FaRegHeart,
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaUserCircle,
} from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { useModal } from "../../modals/context";

// Format date as "DD MMM YY"
const formatShortDate = (dateString: string, locale: Locales) => {
  const date = new Date(dateString);
  return format(date, "dd MMM yy", {
    locale: locale === "es" ? es : enUS,
  });
};

// Define a type for tweet comments
export interface TweetCommentType {
  id: string;
  content: string;
  createdAt: string;
  username: string;
  userHandle: string;
  userAvatar: string;
}

// Tweet Comment Component
interface TweetCommentProps {
  comment: TweetCommentType;
  locale: Locales;
}

const TweetComment: React.FC<TweetCommentProps> = ({ comment, locale }) => {
  const formattedDate = formatShortDate(comment.createdAt, locale);

  return (
    <article className="border-b border-slate-200 dark:border-gray-700 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={comment.userAvatar}
            alt={comment.username}
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="font-bold text-gray-900 dark:text-white text-sm sm:mr-1">
                {comment.username}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {comment.userHandle}
              </p>
            </div>
            <span className="mx-1 text-gray-500 dark:text-gray-400">·</span>
            <p className="text-gray-500 dark:text-gray-400 text-sm hover:underline cursor-pointer">
              {formattedDate}
            </p>
          </div>
          <p className="mt-1 text-gray-800 dark:text-gray-200">
            {comment.content}
          </p>
        </div>
      </div>
    </article>
  );
};

interface TweetProps extends TweetApiResponse {
  onCommentsToggle?: (isShowing: boolean, tweetId: string) => void;
  tweetComments?: TweetCommentType[];
}

const Tweet: React.FC<TweetProps> = ({
  id,
  content,
  createdAt,
  mediaUrl,
  likes,
  comments,
  reposts,
  isLiked = false,
  locale,
  username,
  userHandle,
  userAvatar,
  onCommentsToggle,
  tweetComments = [],
}) => {
  const formattedDate = formatShortDate(createdAt, locale);

  const [liked, setLiked] = React.useState(isLiked);
  const [likeCount, setLikeCount] = React.useState(likes);
  const [reposted, setReposted] = React.useState(false);
  const [repostCount, setRepostCount] = React.useState(reposts);
  const [saved, setSaved] = React.useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [accessToken] = useAtom(accessTokenAtom);
  const { openModal } = useModal();

  const handleLike = (e: React.MouseEvent) => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleRepost = (e: React.MouseEvent) => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    if (reposted) {
      setRepostCount((prev) => prev - 1);
    } else {
      setRepostCount((prev) => prev + 1);
    }
    setReposted(!reposted);
  };

  const handleSave = (e: React.MouseEvent) => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    setSaved(!saved);
  };

  const handleShare = () => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    // Create a tweet URL for sharing
    const tweetUrl = `${window.location.origin}/tweet/${id}`;

    // Copy to clipboard
    try {
      navigator.clipboard.writeText(tweetUrl);
      setShowShareTooltip(true);
      // Hide tooltip after 2 seconds
      setTimeout(() => {
        setShowShareTooltip(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleCommentClick = () => {
    const newState = !showComments;
    setShowComments(newState);

    // Notify parent component to hide other tweets
    if (onCommentsToggle) {
      onCommentsToggle(newState, id);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // Here you would handle submitting the comment to your backend
      console.log("Submitting comment:", commentText);

      // Clear the input after submitting
      setCommentText("");
    }
  };

  return (
    <div
      className={` mb-0 bg-white dark:bg-[#1f2937] transition-all duration-300 ${
        showComments ? "rounded-t-lg shadow-md" : ""
      }`}>
      {/* Main Tweet Section */}
      <article
        className={`border-b border-slate-300 dark:border-gray-600 px-4 py-5 ${
          !showComments && "hover:bg-gray-100 dark:hover:bg-slate-700"
        } transition-colors`}>
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <Image
              src={userAvatar}
              alt={username}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <div className="flex flex-col h-fit">
                <p className="font-bold text-gray-900 dark:text-white text-base">
                  {username}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {userHandle}
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {formattedDate}
              </p>
            </div>
            <p className="mt-1 text-gray-500 dark:text-gray-200 py-2">
              {content}
            </p>

            {mediaUrl && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <Image
                  src={mediaUrl}
                  alt="Tweet media"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-200 hover:scale-105"
                />
              </div>
            )}

            <ul className="mt-3 flex justify-between w-full max-w-xl mx-auto relative">
              <li
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleCommentClick}>
                <p className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:text-[#1d9bf0] dark:hover:bg-[#1d9bf01a] transition-colors">
                  <FaRegComment />
                </p>
                <span>{comments}</span>
              </li>
              <li
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleRepost}>
                <p
                  className={`p-2 rounded-full hover:bg-green-100 dark:hover:bg-[#00ba7c1a] transition-colors ${
                    reposted
                      ? "text-green-500 dark:text-[#00ba7c]"
                      : "text-gray-500 dark:text-gray-400"
                  } dark:hover:text-[#00ba7c]`}>
                  <AiOutlineRetweet />
                </p>
                <span>{repostCount}</span>
              </li>
              <li
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleLike}>
                <p
                  className={`p-2 rounded-full hover:bg-pink-100 dark:hover:bg-[#f918801a] transition-colors ${
                    liked
                      ? "text-pink-500 dark:text-[#f91880]"
                      : "text-gray-500 dark:text-gray-400"
                  } dark:hover:text-[#f91880]`}>
                  {liked ? <FaHeart /> : <FaRegHeart />}
                </p>
                <span>{likeCount}</span>
              </li>
              <li
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleSave}>
                <p
                  className={`p-2 rounded-full hover:bg-purple-100 dark:hover:bg-[#7856ff1a] transition-colors ${
                    saved
                      ? "text-purple-500 dark:text-[#7856ff]"
                      : "text-gray-500 dark:text-gray-400"
                  } dark:hover:text-[#7856ff]`}>
                  {saved ? <FaBookmark /> : <FaRegBookmark />}
                </p>
              </li>
              <li
                className="flex items-center gap-1 cursor-pointer relative"
                onClick={handleShare}>
                <p className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:text-[#1d9bf0] dark:hover:bg-[#1d9bf01a] transition-colors">
                  <FiShare />
                </p>
                {showShareTooltip && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Copied to clipboard
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </article>

      {/* Comments Section (appears below) */}
      {showComments && (
        <div className="comments-section bg-white dark:bg-[#1f2937] border-b border-slate-300 dark:border-gray-600 rounded-b-lg shadow-md">
          <div className="border-t border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-4 py-3 flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Comments
            </h3>
            <button
              onClick={handleCommentClick}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm">
              <IoMdArrowBack className="text-lg" />
              <span className="font-medium">Back to feed</span>
            </button>
          </div>
          <div className="comment-list">
            {tweetComments.length > 0 ? (
              tweetComments.map((comment) => (
                <TweetComment
                  key={comment.id}
                  comment={comment}
                  locale={locale}
                />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>

          {/* Comment input section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-[#1f2937]">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {accessToken ? (
                  <Image
                    src={userAvatar}
                    alt={username}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200">
                    <FaUserCircle className="text-gray-800 w-9 h-9" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={handleCommentChange}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-800 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {commentText.length > 0 && (
                  <button
                    onClick={handleSubmitComment}
                    className="ml-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors">
                    Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweet;
