import "photoswipe/style.css";
import { FaGithub, FaLink, FaExpand } from "react-icons/fa";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useRef, useState } from "react";

type Props = {
  url?: string;
  github?: string;
  imageSrc: string;
  caption?: string;
  width?: number;
  height?: number;
  alt?: string;
};

function ProjectLinkInteractions({
  url,
  github,
  imageSrc,
  caption = "",
  width = 1200,
  height = 800,
  alt = "Project image",
}: Props) {
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const [actualDimensions, setActualDimensions] = useState({ width, height });

  // Load and check the actual image dimensions to maintain aspect ratio
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setActualDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Calculate proportional dimensions for responsive viewing
  const getProportionalDimensions = (maxWidth: number, maxHeight: number) => {
    const { width: originalWidth, height: originalHeight } = actualDimensions;

    // If either dimension is not specified, use the actual image dimensions
    if (!originalWidth || !originalHeight) {
      return { width: maxWidth || width, height: maxHeight || height };
    }

    const aspectRatio = originalWidth / originalHeight;

    // If max dimensions are provided, calculate proportional dimensions
    if (maxWidth && maxHeight) {
      // First try to fit width
      let newWidth = maxWidth;
      let newHeight = newWidth / aspectRatio;

      // If height exceeds max, fit by height instead
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }

      return { width: newWidth, height: newHeight };
    }

    // If only one dimension is provided
    if (maxWidth) {
      return {
        width: maxWidth,
        height: maxWidth / aspectRatio,
      };
    }

    if (maxHeight) {
      return {
        width: maxHeight * aspectRatio,
        height: maxHeight,
      };
    }

    // Default to original dimensions
    return { width: originalWidth, height: originalHeight };
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
        lightboxRef.current = null;
      }
    };
  }, []);

  const handleClick = () => {
    // If lightbox already exists, destroy it first to prevent memory leaks
    if (lightboxRef.current) {
      lightboxRef.current.destroy();
    }

    // Get dimensions while preserving aspect ratio
    const { width: displayWidth, height: displayHeight } =
      getProportionalDimensions(window.innerWidth, window.innerHeight);

    // Create new lightbox with enhanced options
    lightboxRef.current = new PhotoSwipeLightbox({
      dataSource: [
        {
          src: imageSrc,
          width: actualDimensions.width, // Use actual image width
          height: actualDimensions.height, // Use actual image height
          alt,
          caption,
        },
      ],
      pswpModule: () => import("photoswipe"),
      // Enhanced options
      showHideAnimationType: "zoom",
      initialZoomLevel: "fit", // 'fit' ensures the image fits in the viewport
      secondaryZoomLevel: 2,
      maxZoomLevel: 4,
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
      bgOpacity: 0.85,
      wheelToZoom: true,
      pinchToClose: true,
      closeOnVerticalDrag: true,
      clickToCloseNonZoomable: true,
      allowPanToNext: true,
      showHideOpacity: true,
    });

    // Add events for more control
    lightboxRef.current.on("uiRegister", function () {
      if (lightboxRef.current && caption) {
        lightboxRef.current.pswp?.ui?.registerElement({
          name: "custom-caption",
          order: 9,
          isButton: false,
          appendTo: "root",
          html: caption,
          onInit: (el) => {
            el.className = "pswp__custom-caption";
            el.style.cssText =
              "position: absolute; bottom: 0; left: 0; width: 100%; padding: 10px; background: rgba(0,0,0,0.5); color: white; text-align: center;";
          },
        });
      }
    });

    // Initialize and open
    lightboxRef.current.init();
    lightboxRef.current.loadAndOpen(0);
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex space-x-4">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center dark:bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Visit project website">
            <FaLink className="text-gray-800 dark:text-white text-md" />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center dark:bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-200 transition-colors duration-200"
            aria-label="View source code on GitHub">
            <FaGithub className="text-gray-800 dark:text-white text-md" />
          </a>
        )}
        <button
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center dark:bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-200 transition-colors duration-200"
          onClick={handleClick}
          aria-label="View full-size image">
          <FaExpand className="text-gray-800 dark:text-white text-md" />
        </button>
      </div>
    </div>
  );
}

export default ProjectLinkInteractions;
