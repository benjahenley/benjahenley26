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
