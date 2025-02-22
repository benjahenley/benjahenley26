export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ImageType = {
  src: string;
  width?: number;
  height?: number;
  cropped?: boolean;
};

export interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export interface Images {
  data: ImageData[];
}

export interface Contents {
  id: number;
  title: string;
  text: string;
  subtitle: string;
}
export interface Items {
  id: number;
  item: string;
  label: string | null;
  image: string | null;
}

export interface PageContents {
  id: number;
  section: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
  description: string;
  contents: Contents[];
  items: Items[];
  images: Images;
}
