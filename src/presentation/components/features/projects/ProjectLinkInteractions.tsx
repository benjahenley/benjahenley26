import "photoswipe/style.css";
import { FaGithub, FaLink, FaExpand } from "react-icons/fa";
import PhotoSwipeLightbox from "photoswipe/lightbox";

type Props = {
  url?: string;
  github?: string;
  imageSrc: string;
};

function ProjectLinkInteractions({ url, github, imageSrc }: Props) {
  const handleClick = () => {
    const lightbox = new PhotoSwipeLightbox({
      dataSource: [{ src: imageSrc }],
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightbox.loadAndOpen(0);
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex space-x-4">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center dark:bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-200 transition-colors duration-200">
            <FaLink className="text-gray-800 dark:text-white text-md" />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center dark:bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-200 transition-colors duration-200">
            <FaGithub className="text-gray-800 dark:text-white text-md" />
          </a>
        )}
        <button
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center dark:bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-200 transition-colors duration-200"
          onClick={handleClick}>
          <FaExpand className="text-gray-800 dark:text-white text-md" />
        </button>
      </div>
    </div>
  );
}

export default ProjectLinkInteractions;
