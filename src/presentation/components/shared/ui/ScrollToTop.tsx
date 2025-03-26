"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export const ScrollToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Update the scroll listener to detect navbar visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show scroll button when scrolled down enough
      setShowScrollButton(currentScrollY > 300);

      // If scrolling down, navbar is likely hidden
      // If scrolling up, navbar is likely visible
      setIsNavbarVisible(currentScrollY <= lastScrollY || currentScrollY < 50);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className={`fixed ${
            isNavbarVisible ? "bottom-24 md:bottom-6" : "bottom-6"
          } right-6 h-12 w-12 rounded-full 
          bg-gray-300 dark:bg-gray-600 
          shadow-lg dark:shadow-gray-900/30 
          flex items-center justify-center
          hover:bg-gray-300/80 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600
          z-50 transition-all duration-300 group`}
          aria-label="Scroll to top">
          <FiArrowUp className="text-gray-700 dark:text-gray-300 text-xl group-hover:translate-y-[-2px] transition-transform duration-300" />
          <span className="absolute -inset-3 bg-white dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-20 scale-0 group-hover:scale-75 transition-all duration-300"></span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
