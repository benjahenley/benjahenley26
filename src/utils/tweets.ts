import { accessTokenAtom } from "@/atoms/auth";
import { userSession } from "@/atoms/session";
import { get } from "http";

// Types
export interface CommentSubmitParams {
  projectId: number | string;
  content: string;
  userId: string;
}

export interface TweetCommentSubmitParams {
  tweetId: string;
  content: string;
  userId: string;
}

export interface LikeParams {
  itemId: string | number;
  itemType: "tweet" | "project" | "comment";
  userId: string;
}

// Type definitions
export interface CommentSubmission {
  projectId?: number;
  tweetId?: number;
  content: string;
  userId: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  user: {
    name: string;
    handle: string;
    avatar?: string;
  };
  likeCount?: number;
}

export interface TweetLike {
  tweetId: number;
  userId: string;
}

export interface TweetRepost {
  tweetId: number;
  userId: string;
}

export interface TweetBookmark {
  tweetId: number;
  userId: string;
}

// Get user session data from localStorage
export const getUserFromStorage = () => {
  if (typeof window === "undefined") return null;

  const session = localStorage.getItem("userSession");
  if (!session) return null;

  try {
    return JSON.parse(session);
  } catch (error) {
    console.error("Error parsing user session data:", error);
    return null;
  }
};

// ---------------------------------------------------------------------------
// Real feed + comment API (backed by NestJS /api/tweets)
// ---------------------------------------------------------------------------

const API = process.env.NEXT_PUBLIC_API_URL;

const formatHandle = (handle?: string) =>
  handle ? (handle.startsWith("@") ? handle : `@${handle}`) : "";

const fullName = (u: {
  userFirstName?: string;
  userLastName?: string;
  handle?: string;
}) =>
  `${u.userFirstName ?? ""} ${u.userLastName ?? ""}`.trim() ||
  u.handle ||
  "User";

// Choose the translation matching the UI locale, falling back to en then any.
const pickContent = (
  translations: { language: string; content: string }[],
  locale: string
) => {
  if (!translations?.length) return "";
  return (
    translations.find((t) => t.language === locale)?.content ??
    translations.find((t) => t.language === "en")?.content ??
    translations[0].content
  );
};

export interface FeedComment {
  id: string;
  content: string;
  createdAt: string;
  username: string;
  userHandle: string;
  userAvatar: string;
}

export interface FeedTweet {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  reposts: number;
  username: string;
  userHandle: string;
  userAvatar: string;
  tweetComments: FeedComment[];
  isLiked: boolean;
  isReposted: boolean;
  isSaved: boolean;
}

const mapComment = (c: any): FeedComment => ({
  id: String(c.id),
  content: c.content,
  createdAt: c.createdAt,
  username: fullName(c.user ?? {}),
  userHandle: formatHandle(c.user?.handle),
  userAvatar: c.user?.profileImage ?? "",
});

/** Load the feed from the database, localised, with comments attached. */
export const getFeedTweets = async (locale: string): Promise<FeedTweet[]> => {
  const res = await fetch(`${API}/api/tweets`, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load tweets (${res.status})`);

  const data = await res.json();
  return data.map((t: any) => ({
    id: String(t.id),
    content: pickContent(t.translations, locale),
    createdAt: t.date ?? t.createdAt,
    likes: t._count?.likes ?? 0,
    comments: t._count?.comments ?? 0,
    reposts: t._count?.reposts ?? 0,
    username: fullName(t.user ?? {}),
    userHandle: formatHandle(t.user?.handle),
    userAvatar: t.user?.profileImage ?? "",
    tweetComments: (t.comments ?? []).map(mapComment),
    isLiked: false,
    isReposted: false,
    isSaved: false,
  }));
};

/**
 * Create a tweet (owner-only; the backend AdminGuard enforces this and takes
 * the author from the JWT). `translations` carry the per-language HTML from the
 * editor (the composer requires both en and es).
 */
export const postTweet = async (
  translations: { language: string; content: string }[],
  accessToken: string
): Promise<void> => {
  const res = await fetch(`${API}/api/tweets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify({
      category: "FEED",
      techStack: [],
      // userId is ignored server-side (taken from the token), sent for shape.
      userId: 0,
      translations,
    }),
  });
  if (!res.ok) throw new Error(`Failed to post tweet (${res.status})`);
};

const authedPost = async (path: string, accessToken: string) => {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
};

/** Toggle like. Returns the new liked state and the tweet's like count. */
export const toggleTweetLike = (
  tweetId: string,
  accessToken: string
): Promise<{ liked: boolean; count: number }> =>
  authedPost(`/api/tweets/${tweetId}/like`, accessToken);

/** Toggle repost. Returns the new reposted state and repost count. */
export const toggleTweetRepost = (
  tweetId: string,
  accessToken: string
): Promise<{ reposted: boolean; count: number }> =>
  authedPost(`/api/tweets/${tweetId}/repost`, accessToken);

/** Toggle save/bookmark (private). Returns the new saved state. */
export const toggleTweetSave = (
  tweetId: string,
  accessToken: string
): Promise<{ saved: boolean }> =>
  authedPost(`/api/tweets/${tweetId}/save`, accessToken);

/** The current user's liked / reposted / saved tweet ids. */
export const getMyInteractions = async (
  accessToken: string
): Promise<{
  likedTweetIds: number[];
  repostedTweetIds: number[];
  savedTweetIds: number[];
}> => {
  const res = await fetch(`${API}/api/tweets/my-interactions`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to load interactions (${res.status})`);
  return res.json();
};

/** Persist a comment on a tweet. Returns the created comment (with author). */
export const postTweetComment = async (
  tweetId: string,
  content: string,
  accessToken: string
): Promise<FeedComment> => {
  const res = await fetch(`${API}/api/tweets/${tweetId}/add-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error(`Failed to post comment (${res.status})`);
  return mapComment(await res.json());
};

// Submit a new project comment
export const submitProjectComment = async (
  data: CommentSubmission
): Promise<Comment> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, this would be a fetch/axios call to your backend
  // return await fetch('/api/comments', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // }).then(res => res.json());

  // For now, return mock data
  return {
    id: `comment-${Date.now()}`,
    content: data.content,
    createdAt: new Date(),
    userId: data.userId,
    user: {
      name: "Current User", // In a real app, this would come from the server
      handle: "@currentuser",
      avatar: "/images/avatar.png", // Default avatar
    },
    likeCount: 0,
  };
};

// Submit a new tweet comment
export const submitTweetComment = async (
  data: CommentSubmission
): Promise<Comment> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock response
  return {
    id: `comment-${Date.now()}`,
    content: data.content,
    createdAt: new Date(),
    userId: data.userId,
    user: {
      name: "Current User",
      handle: "@currentuser",
      avatar: "/images/avatar.png",
    },
    likeCount: 0,
  };
};

// Like or unlike a tweet/project/comment
export const toggleLike = async ({ itemId, itemType, userId }: LikeParams) => {
  try {
    const userSession = getUserFromStorage();

    if (!userSession?.isLoggedIn) {
      throw new Error("User is not authenticated");
    }

    // In a real implementation, this would call the API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${itemType}s/${itemId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    // For now, just return a mock response
    return {
      success: true,
      isLiked: true,
      likesCount: 1,
    };
  } catch (error) {
    console.error(`Error liking ${itemType}:`, error);
    throw error;
  }
};

/**
 * Like a tweet
 */
export const likeTweet = async (
  data: TweetLike
): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock success response
  return { success: true };
};

/**
 * Repost a tweet
 */
export const repostTweet = async (
  data: TweetRepost
): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock success response
  return { success: true };
};

/**
 * Bookmark a tweet
 */
export const bookmarkTweet = async (
  data: TweetBookmark
): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock success response
  return { success: true };
};

/**
 * Share a tweet - copies link to clipboard
 */
export const shareTweet = async (
  tweetId: number
): Promise<{ success: boolean }> => {
  try {
    const url = `${window.location.origin}/tweets/${tweetId}`;
    await navigator.clipboard.writeText(url);
    return { success: true };
  } catch (error) {
    console.error("Failed to copy:", error);
    return { success: false };
  }
};

/**
 * Get comments for a project
 */
export const getProjectComments = async (
  projectId: number
): Promise<Comment[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Mock data
  return [
    {
      id: "comment1",
      content: "This project looks amazing! I love the tech stack you used.",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      userId: "user1",
      user: {
        name: "Tony Stark",
        handle: "@ironman",
        avatar: "/images/avatars/tony.jpg",
      },
      likeCount: 3,
    },
    {
      id: "comment2",
      content: "The UI is so clean and modern. Great job on the design!",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      userId: "user2",
      user: {
        name: "Steve Rogers",
        handle: "@captain",
        avatar: "/images/avatars/steve.jpg",
      },
      likeCount: 1,
    },
  ];
};
