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
    "6": [
      {
        id: "c6-1",
        content:
          "Just tried out #GeminiAI and I'm amazed at how natural the conversations feel! The future of #AI is looking bright. 🤖✨",
        createdAt: new Date("2024-05-10T14:30:00Z").toISOString(),
        username: "Benja Henley",
        userHandle: "@benjahenley",
        userAvatar: profilePic,
      },
    ],
    "7": [
      {
        id: "c7-1",
        content:
          "Been exploring #TypeScript lately and loving the extra confidence it gives my #JavaScript code. Type safety for the win! 💪",
        createdAt: new Date("2024-04-28T09:15:00Z").toISOString(),
        username: "Benja Henley",
        userHandle: "@benjahenley",
        userAvatar: profilePic,
      },
    ],
    "8": [
      {
        id: "c8-1",
        content:
          "React 19 is out! The new features make building UIs even smoother. Hooks, suspense, and server components are game changers. 🚀 #React19 #WebDev",
        createdAt: new Date("2024-03-15T18:45:00Z").toISOString(),
        username: "Benja Henley",
        userHandle: "@benjahenley",
        userAvatar: profilePic,
      },
    ],
    "9": [
      {
        id: "c9-1",
        content:
          "Experimenting with #NextJS for my latest project. Loving the built-in routing and API routes. Makes full-stack development so much easier! 🌐",
        createdAt: new Date("2024-02-20T11:00:00Z").toISOString(),
        username: "Benja Henley",
        userHandle: "@benjahenley",
        userAvatar: profilePic,
      },
    ],
    "10": [
      {
        id: "c10-1",
        content:
          "AI tools are making coding more fun and productive. From code suggestions to bug fixes, it feels like having a coding buddy 24/7! What's your favorite AI tool? #AI #Coding",
        createdAt: new Date("2024-01-12T16:20:00Z").toISOString(),
        username: "Benja Henley",
        userHandle: "@benjahenley",
        userAvatar: profilePic,
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
        "We're on the third sprint of the Kia website! The current progress is fantastic, hoping for a great final project.",

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
      content: (
        <div>
          <p>
            What developer skills will be most valuable in the next 5 years? I'm
            betting on:
          </p>
          <br />
          <ul>
            <li>1. AI integration</li>
            <li>2. Edge computing</li>
            <li>3. Web performance optimization</li>
          </ul>
          <br />

          <p>What's your top 3?</p>
          <p className="font-bold">#webdev #futuretech #careerAdvice</p>
        </div>
      ),
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
      content: (
        <div>
          <p>
            Just finished 'Clean Code' by Robert C. Martin for the third time.
            Each read reveals new insights! Other favorites: 'The Pragmatic
            Programmer' and 'Refactoring' by Martin Fowler. What programming
            books changed how you write code?
          </p>
          <br />
          <p className="font-bold">#programming #books #cleancode</p>
        </div>
      ),
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
      id: "10",
      content: (
        <div>
          <p>
            AI tools are making coding more fun and productive. From code
            suggestions to bug fixes, it feels like having a coding buddy 24/7!
            What's your favorite AI tool?
            <br />
          </p>
          <br />
          <p className="font-bold">#AI #productivity #coding</p>
        </div>
      ),
      createdAt: new Date("2024-01-12T16:20:00Z").toISOString(),
      likes: 91,
      comments: tweetReplies["10"].length,
      reposts: 17,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["10"],
    },
    {
      id: "6",
      content: (
        <div>
          <p>
            Just tried out{" "}
            <span className="underline cursor-pointer">#GeminiAI</span> and I'm
            amazed at how natural the conversations feel! The future of{" "}
            <span className="underline cursor-pointer">#AI</span> is looking
            bright. 🤖✨
          </p>
          <br />
          <p className="font-bold">#AI #GeminiAI #future</p>
        </div>
      ),
      createdAt: new Date("2024-05-10T14:30:00Z").toISOString(),
      likes: 87,
      comments: tweetReplies["6"].length,
      reposts: 19,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["6"],
    },
    {
      id: "7",
      content: (
        <div>
          <p>
            Been exploring TypeScript lately and loving the extra confidence it
            gives my JavaScript code. Type safety for the win!
          </p>
          <br />
          <p className="font-bold">#TypeScript #JavaScript #webdev</p>
        </div>
      ),
      createdAt: new Date("2024-04-28T09:15:00Z").toISOString(),
      likes: 54,
      comments: tweetReplies["7"].length,
      reposts: 10,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["7"],
    },
    {
      id: "8",
      content: (
        <div>
          <p>
            React 19 is out! The new features make building UIs even smoother.
            Hooks, suspense, and server components are game changers.
          </p>
          <br />
          <p className="font-bold">#React19 #WebDev</p>
        </div>
      ),
      createdAt: new Date("2024-03-15T18:45:00Z").toISOString(),
      likes: 102,
      comments: tweetReplies["8"].length,
      reposts: 23,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["8"],
    },
    {
      id: "9",
      content: (
        <div>
          <p>
            Experimenting with #NextJS for my latest project. Loving the
            built-in routing and API routes. Makes full-stack development so
            much easier! 🌐
          </p>
          <br />
          <p className="font-bold">#NextJS #FullStack #webdev</p>
        </div>
      ),
      createdAt: new Date("2024-02-20T11:00:00Z").toISOString(),
      likes: 76,
      comments: tweetReplies["9"].length,
      reposts: 14,
      username: "Benja Henley",
      userHandle: "@benjahenley",
      userAvatar: profilePic,
      locale,
      tweetComments: tweetReplies["9"],
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
