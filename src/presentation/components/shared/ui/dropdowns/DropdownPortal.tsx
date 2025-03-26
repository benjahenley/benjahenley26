"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DropdownPortalProps = {
  children: ReactNode;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  onClose?: () => void;
};

export default function DropdownPortal({
  children,
  isOpen,
  triggerRef,
  onClose,
}: DropdownPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 5, // Position to the right with a small gap
      });
    }

    // Update position on scroll or resize
    const handlePositionChange = () => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top,
          left: rect.right + 5,
        });
      }
    };

    // Close dropdown on scroll or resize
    const handleScroll = () => {
      if (onClose) {
        onClose();
      }
    };

    const handleResize = () => {
      if (onClose) {
        onClose();
      }
    };

    // Handle click outside (but don't close if clicking inside dropdown content)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        onClose &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handlePositionChange);
    window.addEventListener("scroll", handlePositionChange, true);

    // Add event listeners to close dropdown
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handlePositionChange);
      window.removeEventListener("scroll", handlePositionChange, true);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, triggerRef, onClose]);

  // Return null during SSR
  if (!mounted) return null;

  // Only render when open
  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      className="fixed z-[99999] bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 overflow-visible"
      style={{
        top: `${position.top + 55}px`,
        left: `${position.left - 62}px`,
        maxHeight: "80vh",
        overflowY: "auto",
      }}>
      {children}
    </div>,
    document.body
  );
}
