"use client";
import { useEffect, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { ImageType } from "@/infraestructure/interfaces";
import producerImages from "@/infraestructure/data/producerImages";

const ProducerGallery = () => {
  const [imageDimensions, setImageDimensions] = useState<ImageType[]>([]);

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

  return (
    <div id="my-gallery" className="h-fit relative grid gap-2 grid-cols-3 pt-0">
      {/* Left Column (Normal Scrolling) */}
      <div className="space-y-2">
        {imageDimensions
          .filter((_, index) => index % 3 === 0)
          .map((image, index) => (
            <div key={index} className="overflow-clip relative w-full">
              <a
                href={image.src}
                data-cropped={image.cropped ? "true" : undefined}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                className="w-full">
                <img
                  src={image.src}
                  alt=""
                  className="w-full h-auto object-cover transition-transform rounded-md transform hover:scale-105"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                />
              </a>
            </div>
          ))}
      </div>

      {/* Middle & Right Column (Sticky Scrolling) */}
      {[1, 2].map((colIndex) => (
        <div
          key={colIndex}
          className="sticky top-0 flex flex-col gap-2 overflow-hidden">
          {imageDimensions
            .filter((_, index) => index % 3 === colIndex)
            .map((image, index) => (
              <div key={index} className="w-full overflow-clip">
                <a
                  href={image.src}
                  data-cropped={image.cropped ? "true" : undefined}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  className="w-full">
                  <img
                    src={image.src}
                    alt=""
                    className="w-full h-auto object-cover transition-transform transform hover:scale-105 rounded-md"
                    style={{ aspectRatio: `${image.width} / ${image.height}` }}
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
