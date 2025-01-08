import { Locales } from "./locales";

export type TweetContentProps = {
  className?: string;
  pinned?: boolean;
  date: string;
  likes: any[];
  comments: any[];
  reposts: any[];
  saves: any[];
  locale: Locales;
  techStack: string[];
  images: {
    src: string;
    alt: string;
  }[];
  translations: Array<{
    content: string;
    language: string;
  }>;
};

export type InteractionItemProps = {
  icon: React.ReactNode;
  clicked: React.ReactNode;
  text: string;
  key: string;
  color: string;
  colorText: string;
};

export type tweetProps = {
  className?: string;
  content: any;
  pinned?: boolean;
  date: string;
  children: any;
  likes: number;
  comments: number;
  reposts: number;
  saves: number;
};

export interface TranslationInput {
  language: string;
  content: string;
}

export interface TweetImageInput {
  src: string;
  alt: string;
}

export interface CommentInput {
  content: string;
}

export interface AddTweetArgs {
  link?: string;
  date?: string;
  techStack: string[];
  category: "PROJECT" | "FEED";
  pinned?: boolean;
  userId: number;
  translations: TranslationInput[];
  likes?: number;
  reposts?: number;
  images: TweetImageInput[];
  comments: CommentInput[];
}
