import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  className?: string;
  small?: boolean;
};

function ProfilePic({ className, small }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl =
    "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1739881508/portfolio-24/me/benja_y8dlen.jpg";

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => {
      console.error("Image failed to load.");
      setIsLoaded(false);
    };

    if (img.complete) {
      // Image is already cached and loaded
      handleLoad();
    } else {
      img.onload = handleLoad;
      img.onerror = handleError;
    }

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className={className}>
      <div
        className={`${
          small
            ? "w-10 h-10 border-transparent"
            : "w-20 h-20 sm:w-40 sm:h-40 absolute top-[-4px] left-[-4px]"
        } rounded-full overflow-hidden flex items-center justify-center bg-gray-200`}>
        {!isLoaded ? (
          <FaUserCircle
            className={`text-gray-800 ${
              small ? "w-10 h-10" : "w-20 h-20 sm:w-40 sm:h-40"
            }`}
          />
        ) : (
          <img
            src={imageUrl}
            alt="benja"
            className={`${small ? "w-10 h-10" : "w-20 h-20 sm:w-40 sm:h-40"}`}
          />
        )}
      </div>
    </div>
  );
}

export default ProfilePic;
