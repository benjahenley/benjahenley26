"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaTrashCan } from "react-icons/fa6";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  // Container ref for positioning the reset button
  const containerRef = useRef<HTMLDivElement>(null);

  // Reduced and optimized box counts
  const rows = new Array(30).fill(1);
  const cols = new Array(22).fill(1);

  const colors = [
    "rgba(59, 130, 246, 0.7)", // blue-500 - Frontend
    "rgba(79, 70, 229, 0.7)", // indigo-600 - Frontend
    "rgba(16, 185, 129, 0.7)", // emerald-500 - Backend
    "rgba(22, 163, 74, 0.7)", // green-600 - Backend
    "rgba(168, 85, 247, 0.7)", // purple-500 - APIs
    "rgba(124, 58, 237, 0.7)", // violet-600 - APIs
    "rgba(244, 114, 182, 0.7)", // pink-400 - Styling
    "rgba(225, 29, 72, 0.7)", // rose-500 - Styling
    "rgba(251, 146, 60, 0.7)", // orange-400 - DevOps
    "rgba(239, 68, 68, 0.7)", // red-500 - DevOps
    "rgba(56, 189, 248, 0.7)", // sky-400 - Other Tools
  ];

  // Track which boxes have been clicked
  const [clickedBoxes, setClickedBoxes] = useState<Record<string, string>>({});

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle click on a box
  const handleBoxClick = (rowIndex: number, colIndex: number) => {
    const boxKey = `${rowIndex}-${colIndex}`;

    setClickedBoxes((prev) => {
      if (boxKey in prev) {
        const newState = { ...prev };
        delete newState[boxKey];
        return newState;
      } else {
        return {
          ...prev,
          [boxKey]: getRandomColor(),
        };
      }
    });
  };

  // Reset all clicked boxes
  const resetClickedBoxes = () => {
    setClickedBoxes(() => ({}));
  };

  // Check if any boxes are clicked
  const hasClickedBoxes = Object.keys(clickedBoxes).length > 0;

  return (
    <div className="relative w-full h-full max-w-[1200px] max-h-[800px] mx-auto overflow-hidden">
      <div
        ref={containerRef}
        style={{
          transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
        }}
        className={cn(
          "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
          className
        )}
        {...rest}>
        {rows.map((_, i) => (
          <motion.div
            key={`row` + i}
            className="w-16 h-8 border-l border-slate-700/40 relative">
            {cols.map((_, j) => {
              const boxKey = `${i}-${j}`;
              const isClicked = boxKey in clickedBoxes;

              return (
                <motion.div
                  onClick={() => handleBoxClick(i, j)}
                  whileHover={{
                    backgroundColor: !isClicked ? getRandomColor() : undefined,
                    scale: 1.05,
                    transition: { duration: 0.1 },
                  }}
                  animate={{
                    backgroundColor: isClicked
                      ? clickedBoxes[boxKey]
                      : "transparent",
                    transition: { duration: 0.3 },
                  }}
                  key={`col` + j}
                  style={{
                    cursor: "pointer",
                    backgroundColor: isClicked
                      ? clickedBoxes[boxKey]
                      : "transparent",
                  }}
                  className="w-16 h-8 border-r border-t border-slate-700/40 relative transition-colors">
                  {j % 2 === 0 && i % 2 === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700/60 stroke-[1px] pointer-events-none">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  ) : null}
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Redesigned Reset Button */}
      <AnimatePresence>
        {hasClickedBoxes && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={resetClickedBoxes}
            className="absolute bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-slate-700 backdrop-blur-sm text-white flex items-center justify-center hover:rotate-90 transition-all duration-500 transform-gpu border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <FaTrashCan className="text-xl p-[2px] hover:scale-105" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
