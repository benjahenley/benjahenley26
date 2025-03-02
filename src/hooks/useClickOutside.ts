import { useEffect, RefObject } from "react";

/**
 * Hook that detects clicks outside of the specified element
 * @param ref - React ref object for the element to monitor
 * @param callback - Function to call when a click outside is detected
 * @param enabled - Optional flag to enable/disable the hook (defaults to true)
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    // Skip if disabled
    if (!enabled) return;

    const handleClickOutside = (event: Event) => {
      // Check if the click was outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback, enabled]); // Re-run effect if ref, callback, or enabled change
}

export default useClickOutside;
