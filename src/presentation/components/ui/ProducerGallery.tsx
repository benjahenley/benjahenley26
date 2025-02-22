"use client";
import { useEffect, useState, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { ImageType } from "@/infraestructure/interfaces";
import producerImages from "@/infraestructure/data/producerImages";

const ProducerGallery = () => {
  const [imageDimensions, setImageDimensions] = useState<ImageType[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const updatedImages = await Promise.all(
        producerImages.map(async (image: ImageType) => {
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

  useEffect(() => {
    const handleScroll = () => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const galleryRect = gallery.getBoundingClientRect();
      const scrollY = window.scrollY;
      const galleryTop = galleryRect.top + scrollY;
      const galleryHeight = gallery.offsetHeight;

      columnRefs.current.forEach((col, index) => {
        if (!col) return;

        const releasePoint =
          galleryTop + galleryHeight * (index / columnRefs.current.length);

        if (scrollY >= releasePoint) {
          col.style.position = "relative";
          col.style.top = `${
            galleryHeight * (index / columnRefs.current.length)
          }px`;
        } else {
          col.style.position = "sticky";
          col.style.top = "0";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={galleryRef}
      id="my-gallery"
      className="h-fit relative grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 pt-0">
      {[0, 1, 2].map((colIndex) => (
        <div
          key={colIndex}
          className="parallax-column space-y-2"
          ref={(el: any) => (columnRefs.current[colIndex] = el)}>
          {imageDimensions
            .filter((_, index) => index % 3 === colIndex)
            .map((image: ImageType, index: number) => (
              <div key={index} className="relative w-full">
                <a
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
                      willChange: "transform",
                    }}
                  />
                </a>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ProducerGallery;
