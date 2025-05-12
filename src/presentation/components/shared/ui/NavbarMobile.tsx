"use client";

import { FC, useEffect, useRef, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";
import { Locales } from "@/infraestructure/interfaces";

// Add TypeScript declaration for the global window property
declare global {
  interface Window {
    toggleLeftbarMobileMenu?: () => void;
  }
}

type Props = {
  className?: string;
  locale: Locales;
  onToggleMobileMenu?: () => void;
};

const NavbarMobile: FC<Props> = ({ className, locale, onToggleMobileMenu }) => {
  const [menu, setMenu] = useState(false);
  const [trends, setTrends] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const NAVBAR_HEIGHT = 80; // 20rem in pixels

  // Handle dynamic padding to compensate for navbar
  useEffect(() => {
    // Set initial padding
    document.body.style.paddingBottom = isVisible
      ? `${NAVBAR_HEIGHT}px`
      : "0px";

    // Add transition for smooth content adjustment
    document.body.style.transition = "padding-bottom 0.5s ease-in-out";

    return () => {
      // Clean up
      document.body.style.paddingBottom = "0px";
      document.body.style.transition = "";
    };
  }, []);

  // Update padding when navbar visibility changes
  useEffect(() => {
    document.body.style.paddingBottom = isVisible
      ? `${NAVBAR_HEIGHT}px`
      : "0px";
  }, [isVisible]);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenu(false);
    }
  };

  // Handle scroll events to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine if we should show or hide the navbar
      // If scrolling up or at top of page, show navbar
      // If scrolling down, hide navbar
      const shouldBeVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setIsVisible(shouldBeVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  // Handle touch gestures for swiping
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // If swiping down (negative diff), show navbar
      // If swiping up (positive diff), hide navbar
      if (Math.abs(diff) > 50) {
        // threshold for swipe detection
        setIsVisible(diff < 0);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartY]);

  useEffect(() => {
    if (menu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  // Update the onClick handler for the menu button
  const handleMenuClick = () => {
    console.log("Menu button clicked");

    // First, try to use the direct prop if provided
    if (typeof onToggleMobileMenu === "function") {
      console.log("Using onToggleMobileMenu prop");
      onToggleMobileMenu();
      return;
    }

    // Always set local menu state to maintain compatibility with old LeftbarMobile
    setMenu(true);

    // Try to use the global toggle if it exists
    if (typeof window.toggleLeftbarMobileMenu === "function") {
      console.log("Using global toggleLeftbarMobileMenu");
      window.toggleLeftbarMobileMenu();
    } else {
      console.log(
        "toggleLeftbarMobileMenu is not available, falling back to local state"
      );
    }
  };

  return (
    <div className={className}>
      <div
        ref={navbarRef}
        className={`z-[9999] fixed md:hidden -bottom-1 -left-1 -right-1 h-20 transition-all duration-500 ease-in-out
          rounded-t-2xl border-t border-white/20
          shadow-[0_-4px_24px_0_rgba(124,58,237,0.10)]
          backdrop-blur-xl
          bg-navbar-purple-gradient dark:bg-navbar-green-gradient
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-90"
          }
        `}
        style={{
          boxShadow: isVisible ? "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
        }}>
        <div className="w-full h-full flex justify-between items-center text-white px-6">
          <div
            className="flex items-center justify-left text-4xl"
            onClick={handleMenuClick}>
            <HiOutlineMenu className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-center relative">
            <text
              className="relative z-10 text-4xl font-bold"
              style={{
                fontFamily: "Helvetica, sans-serif",
                lineHeight: "normal",
              }}>
              BH
            </text>
          </div>

          <div className="text-4xl flex items-center justify-end mr-2">
            <FiTrendingUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
