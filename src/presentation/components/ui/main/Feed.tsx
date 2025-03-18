"use client";

import { useState } from "react";
import { Locales } from "@/infraestructure/interfaces";
import Tweet, { TweetCommentType } from "../../shared/ui/cards/Tweet";

type Props = {
  locale: Locales;
  className?: string;
};

export default function Feed({ locale, className }: Props) {
  const [activeTweetId, setActiveTweetId] = useState<string | null>(null);

  // User profile pic
  const profilePic =
    "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1739881508/portfolio-24/me/benja_y8dlen.jpg";

  // Define tweet replies for each tweet
  const tweetReplies: Record<string, TweetCommentType[]> = {
    "1": [
      {
        id: "c1-1",
        content:
          "Love the mobile improvements! What responsive framework did you use?",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        username: "Alex Johnson",
        userHandle: "@alexdev",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: "c1-2",
        content:
          "This looks fantastic! Would love to know more about your design process.",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        username: "Sarah Miller",
        userHandle: "@sarahcodes",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: "c1-3",
        content:
          "Great work! How long did it take you to implement these features?",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        username: "Ryan Thompson",
        userHandle: "@ryandev",
        userAvatar: "https://randomuser.me/api/portraits/men/85.jpg",
      },
    ],
    "2": [
      {
        id: "c2-1",
        content:
          "The animation is so smooth! Have you tried using GSAP as well?",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        username: "Emma Wilson",
        userHandle: "@emmaw",
        userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: "c2-2",
        content: "Love the parallax effect! How does it perform on mobile?",
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        username: "Marcus Chen",
        userHandle: "@marcusdesign",
        userAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
    ],
    "3": [
      {
        id: "c3-1",
        content:
          "AI integration will definitely be huge. Learning LLM prompting now!",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Jennifer Lee",
        userHandle: "@jenniferlee",
        userAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
      },
      {
        id: "c3-2",
        content:
          "WebAssembly and edge computing seem promising for high-performance web apps.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        username: "David Kumar",
        userHandle: "@davidkumar",
        userAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
      {
        id: "c3-3",
        content:
          "Don't forget about accessibility! It's going to be even more important.",
        createdAt: new Date(
          Date.now() - 2.5 * 24 * 60 * 60 * 1000
        ).toISOString(),
        username: "Samantha Jones",
        userHandle: "@samjones",
        userAvatar: "https://randomuser.me/api/portraits/women/89.jpg",
      },
    ],
    "4": [
      {
        id: "c4-1",
        content:
          "Pragmatic Programmer changed my approach to software development completely.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Michael Scott",
        userHandle: "@michaelscott",
        userAvatar: "https://randomuser.me/api/portraits/men/40.jpg",
      },
      {
        id: "c4-2",
        content:
          "Design Patterns by GoF is a classic! Still relevant after all these years.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Lisa Wong",
        userHandle: "@lisawong",
        userAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
    ],
    "5": [
      {
        id: "c5-1",
        content:
          "Which Linux distro are you using? I've been loving PopOS lately.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Kevin Martinez",
        userHandle: "@kevinm",
        userAvatar: "https://randomuser.me/api/portraits/men/47.jpg",
      },
      {
        id: "c5-2",
        content:
          "Have you tried using i3 window manager? It's amazing for productivity!",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        username: "Olivia Parker",
        userHandle: "@oliviatech",
        userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
      },
      {
        id: "c5-3",
        content: "What terminal setup are you using? Share your dotfiles!",
        createdAt: new Date(
          Date.now() - 6.5 * 24 * 60 * 60 * 1000
        ).toISOString(),
        username: "Nathan Ford",
        userHandle: "@nathanf",
        userAvatar: "https://randomuser.me/api/portraits/men/59.jpg",
      },
    ],
  };

  // Hardcoded example tweets
  const tweets = [
    {
      id: "1",
      content:
        "Just deployed a new feature in my latest project! The responsive design adapts beautifully from mobile to desktop. Proud of the CSS Grid implementation! #webdev #react #responsive",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      likes: 42,
      comments: tweetReplies["1"].length,
      reposts: 5,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      isLiked: true,
      locale,
      tweetComments: tweetReplies["1"],
    },
    {
      id: "2",
      content:
        "Exploring animation libraries this week. The combination of Framer Motion with React Three Fiber creates incredible interactive 3D effects. Here's a preview of my experiments with particle systems:",
      mediaUrl:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      likes: 78,
      comments: tweetReplies["2"].length,
      reposts: 24,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["2"],
    },
    {
      id: "3",
      content:
        "What developer skills will be most valuable in the next 5 years? I'm betting on: 1) AI integration, 2) Edge computing, 3) Web performance optimization. What's your top 3? #webdev #futuretech #careeradvice",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      likes: 65,
      comments: tweetReplies["3"].length,
      reposts: 14,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["3"],
    },
    {
      id: "4",
      content:
        "Just finished 'Clean Code' by Robert C. Martin for the third time. Each read reveals new insights! Other favorites: 'The Pragmatic Programmer' and 'Refactoring' by Martin Fowler. What programming books changed how you write code? #programming #books #cleancode",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      likes: 94,
      comments: tweetReplies["4"].length,
      reposts: 18,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["4"],
    },
    {
      id: "5",
      content:
        "My new Ubuntu + i3 development setup is a game-changer! Customized Neovim, tmux sessions, and custom keybindings have doubled my productivity. Will share my dotfiles repo soon! #linux #development #productivity #i3wm",
      mediaUrl:
        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      likes: 120,
      comments: tweetReplies["5"].length,
      reposts: 31,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["5"],
    },
  ];

  // Handle toggling comments view
  const handleCommentsToggle = (isShowing: boolean, tweetId: string) => {
    setActiveTweetId(isShowing ? tweetId : null);
  };

  return (
    <div
      className={`${className} divide-y divide-gray-200 dark:divide-gray-700`}>
      {tweets.map((tweet) => {
        // Only show the tweet if it's the active one with comments open, or if no tweet is currently active
        const shouldShowTweet = !activeTweetId || activeTweetId === tweet.id;

        return shouldShowTweet ? (
          <Tweet
            key={tweet.id}
            {...tweet}
            onCommentsToggle={handleCommentsToggle}
          />
        ) : null;
      })}
    </div>
  );
}
