"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

type Props = {
  date: string;
};

function CalendarDateExpandable({ date }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center overflow-hidden bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full md:p-3 cursor-pointer gap-2"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
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

export default CalendarDateExpandable;
