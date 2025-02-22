import { Locales } from "./locales";
import { IconType } from "react-icons";

export type TweetLocalContentProps = {
  className?: string;
  pinned?: boolean;
  description: string | string[];
  date: string;
  likes: any[];
  comments: any[];
  reposts: any[];
  saves: any[];
  locale: Locales;
  techStack: string[];
  link: string;
};

export interface TweetApiResponse {
  id: number;
  date: string;
  techStack: string[];
  category: string;
  pinned: boolean;
  link: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  locale: Locales;
  description: string;
  // TODO: CHANGE TYPES:
  images: any;
  likes: any;
  comments: any;
  reposts: any;
  saves: any;
}

export type InteractionItemProps = {
  function?: Function;
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
