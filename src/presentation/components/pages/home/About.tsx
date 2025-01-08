import "photoswipe/style.css";
import { useEffect, useState } from "react";
import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { SectionTitle, TextBase } from "../../ui/Texts";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  locale: Locales;
};

type ImageType = {
  src: string;
  width?: number;
  height?: number;
  cropped?: boolean;
};

const images: ImageType[] = [
  { src: "/photos/me/me1.jpg" },
  { src: "/photos/me/me2.jpg", cropped: true },
  { src: "/photos/me/me3.jpg" },
  { src: "/photos/me/me6.jpg" },
  { src: "/photos/me/me4.jpg" },
  { src: "/photos/me/me8.jpg" },
];

export default function About({ className, locale, style }: Props) {
  const [imageDimensions, setImageDimensions] = useState<ImageType[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const updatedImages = await Promise.all(
        images.map(async (image) => {
          const img = new Image();
          img.src = image.src;
          await img.decode();
          return {
            ...image,
            width: img.naturalWidth,
            height: img.naturalHeight,
          };
        })
      );
      setImageDimensions(updatedImages);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#my-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div className={className + " p-3"} style={style}>
      <SectionTitle className="mb-4">
        {contents[locale].pages.home.about.title}
      </SectionTitle>
      {contents[locale].pages.home.about.texts.map((item, key) => (
        <TextBase className="mb-4" key={key}>
          {item}
          {key === 4 && (
            <>
              &nbsp;
              <a
                href="https://open.spotify.com/artist/6BzP9m9BqegCaCajUA4IEg"
                target="_blank"
                className="text-blue-500 underline">
                <strong>{contents[locale].pages.home.about.link}</strong>
              </a>
            </>
          )}
        </TextBase>
      ))}

      <div
        id="my-gallery"
        className="pswp-gallery grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center justify-center">
        {imageDimensions.map((image, index) => (
          <a
            key={index}
            href={image.src}
            data-cropped={image.cropped ? "true" : undefined}
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            className="w-full">
            <img
              src={image.src}
              alt=""
              className="w-full h-auto object-cover transition-transform transform hover:scale-105"
              style={{
                aspectRatio: `${image.width} / ${image.height}`,
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
