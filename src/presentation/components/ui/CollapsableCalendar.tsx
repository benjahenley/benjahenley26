"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  date: string;
};

function CollapsableCalendar({ date }: Props) {
  const [hovered, setHovered] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Use our custom hook to handle clicks outside
  useClickOutside(
    calendarRef,
    () => {
      if (hovered) setHovered(false);
    },
    hovered
  );

  const handleCalendarClick = () => {
    setHovered(!hovered);
  };

  return (
    <motion.div
      ref={calendarRef}
      className="flex p-2 items-center overflow-hidden bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full md:p-3 gap-2 cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleCalendarClick}
      initial={{ width: "auto" }}
      animate={{ width: hovered ? "auto" : "auto" }}
      transition={{ duration: 0.3 }}>
      <FaCalendarAlt className="text-md" />
      {hovered && (
        <motion.time
          className="text-sm mt-[1px] overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4, type: "spring" }}>
          {date}
        </motion.time>
      )}
    </motion.div>
  );
}

export default CollapsableCalendar;
