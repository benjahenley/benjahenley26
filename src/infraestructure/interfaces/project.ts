import { Locales } from "./locales";

export type Project = {
  title: string;
  description: string | string[];
  url: string;
  date: string;
  github_link: string;
};

export type Count = {
  likes: number;
  comments: number;
  reposts: number;
};

export type ProjectComment = {};

export interface ApiProjectItemResponse {
  id: number;
  name: string;
  comments: ProjectComment[] | any;
  createdAt: string;
  updatedAt: string;
  _count: Count;
}

export interface LocalProjectItem {
  pinned?: boolean;
  /** When true, shows a single image that switches with the theme (light/dark) instead of the side-by-side grid. */
  themeImage?: boolean;
  title: string;
  projectId: string;
  description: {
    en: string;
    es: string;
  };
  url: string;
  github: string;
  date: string;
  images: {
    dark: string;
    light: string;
  };
  techStack: string[];
}
