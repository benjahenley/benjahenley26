export enum TweetCategory {
  PROJECT = "PROJECT",
  FEED = "FEED",
}

export interface Tweet {
  id: string;
  date: string;
  techStack: string;
  category: TweetCategory;
  pinned: boolean;
  link?: string;
  reposts: {
    id: string;
    user: { id: string; name: string };
    createdAt: string;
  }[];
  comments: {
    id: string;
    content: string;
    userId: string;
    createdAt: string;
  }[];
  likes: {
    id: string;
    user: { id: string; name: string };
    createdAt: string;
    updatedAt: string;
  }[];
  images: { src: string; alt: string }[];
  translations: { content: string; language: string }[];
  user: { id: string; name: string; profileImage?: string };
  createdAt: string;
  updatedAt: string;
}
