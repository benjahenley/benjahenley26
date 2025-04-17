"use client";
import { useEffect, useState, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { ImageType } from "@/infraestructure/interfaces";
import { motion, useScroll, useTransform } from "framer-motion";

const producerImages: any = [
  {
    src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1730053180/portfolio-24/me/me1_zcjbh7.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1730053180/portfolio-24/me/me2_cgongv.jpg",
    cropped: true,
  },
  {
    src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1730053180/portfolio-24/me/me3_kiq6kh.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1730053180/portfolio-24/me/me6_m1hdjf.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1730053180/portfolio-24/me/me4_mpibjz.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1730053181/portfolio-24/me/me8_xm5dxg.jpg",
  },
];

const ProducerGallery = () => {
  const [imageDimensions, setImageDimensions] = useState<ImageType[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  // Transform values for different scroll speeds
  const column2Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const column3Y = useTransform(scrollYProgress, [0, 1], [0, 240]);

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
    <div
      id="my-gallery"
      ref={galleryRef}
      className="h-fit relative grid grid-cols-3 pt-0 mb-[280px] mt-20">
      {/* Grid Background */}
      <div
        className="absolute inset-0 w-full z-0 opacity-30 pointer-events-none"
        style={{ height: "calc(100% + 240px)" }}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120, 120, 120, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 120, 120, 0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "-1px -1px",
          }}
        />
      </div>

      {/* Left Column (Fixed Position) */}
      <div className="relative z-10">
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
                  className="w-full h-auto object-cover transition-transform transform hover:scale-105"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                />
              </a>
            </div>
          ))}
      </div>

      {/* Middle Column (Medium Scroll Speed) */}
      <motion.div
        style={{ y: column2Y }}
        className="flex flex-col overflow-hidden relative z-10">
        {imageDimensions
          .filter((_, index) => index % 3 === 1)
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
                  className="w-full h-auto object-cover transition-transform transform hover:scale-105"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                />
              </a>
            </div>
          ))}
      </motion.div>

      {/* Right Column (Fast Scroll Speed) */}
      <motion.div
        style={{ y: column3Y }}
        className="flex flex-col overflow-hidden relative z-10">
        {imageDimensions
          .filter((_, index) => index % 3 === 2)
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
                  className="w-full h-auto object-cover transition-transform transform hover:scale-105"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                />
              </a>
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default ProducerGallery;
