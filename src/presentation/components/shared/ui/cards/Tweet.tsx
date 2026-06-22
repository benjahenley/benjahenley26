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
import { IoMdClose } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { userSession } from "@/atoms/session";
import { useModal } from "../../modals/context";
import TweetContent from "./TweetContent";
import {
  postTweetComment,
  toggleTweetLike,
  toggleTweetRepost,
  toggleTweetSave,
} from "@/utils/tweets";

// Detect editor HTML (e.g. "<p>…</p>") vs plain seeded text.
const looksLikeHtml = (s: string) => /<\/?[a-z][\s\S]*>/i.test(s);

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
          {comment.userAvatar ? (
            <Image
              src={comment.userAvatar}
              alt={comment.username}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <FaUserCircle className="text-gray-800 dark:text-gray-300 w-9 h-9" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-start justify-between gap-3">
            <div className="min-w-0 flex flex-wrap items-center gap-x-1 gap-y-0.5">
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {comment.username}
              </p>
              <p className="truncate text-gray-500 dark:text-gray-400 text-sm">
                {comment.userHandle}
              </p>
            </div>
            <p className="shrink-0 text-gray-500 dark:text-gray-400 text-sm">
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
  showComments?: boolean;
  isReposted?: boolean;
  isSaved?: boolean;
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
  isReposted = false,
  isSaved = false,
  locale,
  username,
  userHandle,
  userAvatar,
  onCommentsToggle,
  tweetComments = [],
  showComments = false,
}) => {
  const formattedDate = formatShortDate(createdAt, locale);

  const [liked, setLiked] = React.useState(isLiked);
  const [likeCount, setLikeCount] = React.useState(likes);
  const [reposted, setReposted] = React.useState(isReposted);
  const [repostCount, setRepostCount] = React.useState(reposts);
  const [saved, setSaved] = React.useState(isSaved);

  // The feed loads my-interactions after the session is restored, so these
  // props can arrive after mount — keep local state in sync with them.
  useEffect(() => setLiked(isLiked), [isLiked]);
  useEffect(() => setReposted(isReposted), [isReposted]);
  useEffect(() => setSaved(isSaved), [isSaved]);
  useEffect(() => setLikeCount(likes), [likes]);
  useEffect(() => setRepostCount(reposts), [reposts]);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [accessToken] = useAtom(accessTokenAtom);
  const [session] = useAtom(userSession);
  // Comments live in local state so a freshly posted one shows immediately.
  // (Seeded from props; the feed is still mock data, so these last for the
  // session rather than persisting to the database — see add-comment endpoint.)
  const [commentList, setCommentList] =
    useState<TweetCommentType[]>(tweetComments);
  const [commentCount, setCommentCount] = useState(comments);
  const { openModal } = useModal();

  const handleLike = async (e: React.MouseEvent) => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    // Optimistic update, reconciled with the server response (or reverted).
    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!prevLiked);
    setLikeCount((c) => (prevLiked ? c - 1 : c + 1));
    try {
      const res = await toggleTweetLike(id, accessToken);
      setLiked(res.liked);
      setLikeCount(res.count);
    } catch (err) {
      console.error("Failed to like:", err);
      setLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  const handleRepost = async (e: React.MouseEvent) => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    const prevReposted = reposted;
    const prevCount = repostCount;
    setReposted(!prevReposted);
    setRepostCount((c) => (prevReposted ? c - 1 : c + 1));
    try {
      const res = await toggleTweetRepost(id, accessToken);
      setReposted(res.reposted);
      setRepostCount(res.count);
    } catch (err) {
      console.error("Failed to repost:", err);
      setReposted(prevReposted);
      setRepostCount(prevCount);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    const prevSaved = saved;
    setSaved(!prevSaved);
    try {
      const res = await toggleTweetSave(id, accessToken);
      setSaved(res.saved);
    } catch (err) {
      console.error("Failed to save:", err);
      setSaved(prevSaved);
    }
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

    // Notify parent component to hide other tweets
    if (onCommentsToggle) {
      onCommentsToggle(newState, id);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;

    e.preventDefault();
    void handleSubmitComment();
  };

  // Send unauthenticated users to login as soon as they try to comment.
  // Use mousedown + preventDefault (not focus): if we opened the modal on focus,
  // closing it would return focus to this input and immediately reopen it.
  // preventing focus here means there's nothing to refocus when the modal closes.
  const handleCommentMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!accessToken) {
      e.preventDefault();
      openModal("SIGN_IN");
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!accessToken) {
      openModal("SIGN_IN");
      return;
    }

    const text = commentText.trim();
    if (!text || submitting) return;

    setSubmitting(true);
    try {
      // Persist to the database; the response carries the saved comment
      // (with its real id and author), so it survives a reload.
      const created = await postTweetComment(id, text, accessToken);
      setCommentList((prev) => [...prev, created]);
      setCommentCount((prev) => prev + 1);
      setCommentText("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setSubmitting(false);
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
            <div className="mt-1 text-gray-500 dark:text-gray-200 py-2">
              {typeof content !== "string" ? (
                content
              ) : looksLikeHtml(content) ? (
                // HTML from the owner's editor (trusted: posting is ADMIN-only).
                <div
                  className="[&_a]:text-blue-500 [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:dark:border-gray-600 [&_blockquote]:pl-3 [&_blockquote]:italic [&_p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <TweetContent content={content} />
              )}
            </div>

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
                <span>{commentCount}</span>
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
              Replies
            </h3>
            <button
              onClick={handleCommentClick}
              aria-label="Close replies"
              className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-white dark:hover:bg-slate-700 transition-colors">
              <IoMdClose className="text-xl" />
            </button>
          </div>
          <div className="comment-list">
            {commentList.length > 0 ? (
              commentList.map((comment) => (
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
                {accessToken && session.profileImg ? (
                  <Image
                    src={session.profileImg}
                    alt={session.handle || "You"}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <FaUserCircle className="text-gray-800 dark:text-gray-300 w-9 h-9" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={handleCommentChange}
                  onKeyDown={handleCommentKeyDown}
                  onMouseDown={handleCommentMouseDown}
                  readOnly={!accessToken}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent"
                />
                {commentText.length > 0 && (
                  <button
                    onClick={handleSubmitComment}
                    disabled={submitting}
                    className="ml-2 px-4 py-1.5 bg-gray-900 hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 rounded-full text-sm font-medium transition-colors disabled:opacity-50">
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
