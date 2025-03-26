import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type Props = {
  className?: string;
  small?: boolean;
};

function ProfilePic({ className, small }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
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

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const openModal = () => {
    if (isLoaded) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={className}>
        <div
          className={`
            profile-image
            ${
              small
                ? "w-10 h-10 border-transparent"
                : "w-20 h-20 sm:w-40 sm:h-40 absolute top-[-4px] left-[-4px]"
            } 
            rounded-full 
            overflow-hidden 
            flex 
            items-center 
            justify-center 
            bg-gray-200
            hover:ring-1
            hover:ring-opacity
            hover:ring-violet-200
            transition-all
            duration-300
            cursor-pointer
          `}
          onClick={openModal}>
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
              className={`
                ${small ? "w-10 h-10" : "w-20 h-20 sm:w-40 sm:h-40"}
                transition-transform 
                duration-300 
                hover:scale-105
              `}
            />
          )}
        </div>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300">
          <div
            ref={modalRef}
            className="relative w-fit max-h-[90vh] dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 animate-modal-in">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white transition-all">
              <IoMdClose size={24} />
            </button>

            <div className="flex items-center justify-center w-full h-full">
              <img
                src={imageUrl}
                alt="Benjamin Profile"
                className="max-w-full max-h-[80vh] object-contain rounded shadow-lg"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h3 className="text-xl font-bold">Benjamin Henley</h3>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-modal-in {
          animation: modalIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default ProfilePic;
