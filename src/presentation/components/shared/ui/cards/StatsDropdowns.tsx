import { StatsSection } from "@/types/content";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiBook,
  FiHeart,
  FiStar,
  FiThumbsUp,
  FiClock,
  FiAward,
  FiMonitor,
  FiChevronDown,
  FiTrendingUp,
} from "react-icons/fi";

// Define types for our component props
type ColorType =
  | "blue"
  | "green"
  | "purple"
  | "yellow"
  | "red"
  | "pink"
  | "indigo"
  | "gray";

type StatItemProps = {
  icon: React.ReactNode;
  title: string;
  content: string;
  color: ColorType;
  isExpanded: boolean;
  isActive: boolean;
  onToggleExpand: () => void;
  index: number;
};

const StatItem = ({
  icon,
  title,
  content,
  color = "blue" as ColorType,
  isExpanded,
  isActive,
  onToggleExpand,
  index,
}: StatItemProps) => {
  const colorClasses: Record<ColorType, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    red: "text-red-600 dark:text-red-400",
    pink: "text-pink-600 dark:text-pink-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
    gray: "text-gray-600 dark:text-gray-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`p-2 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 cursor-pointer relative overflow-hidden group ${
        isExpanded ? "shadow-lg" : ""
      } ${
        isActive
          ? "scale-y-[1.05] shadow-[0_0_25px_rgba(255,215,0,0.9)] dark:shadow-[0_0_25px_rgba(255,215,0,0.6)] z-10"
          : ""
      }`}
      onClick={onToggleExpand}
      data-index={index}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-400 dark:from-emerald-700 dark:to-emerald-600 opacity-90 dark:opacity-80"></div>

      {/* Rotated rectangle design element */}
      <div className="absolute h-[120%] w-[125%] inset-[-20px] rotate-[25deg] bg-gradient-to-r from-purple-200 to-purple-300 dark:from-emerald-600 dark:to-emerald-500 opacity-50"></div>

      {/* Content container - must be positioned relative to appear above the background */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full bg-white dark:bg-gray-800 ${
                colorClasses[color]
              } 
              transition-all duration-300 
              ${
                isActive
                  ? "shadow-[0_0_20px_rgba(255,215,0,0.9)] scale-125"
                  : ""
              }
              ${isExpanded ? "animate-spin-once" : ""}`}>
              <div
                className={`transition-transform duration-500 ${
                  isExpanded ? "rotate-[360deg]" : "rotate-0"
                }`}>
                {icon}
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
          </div>
          <FiChevronDown
            className={`w-5 h-5 text-gray-800 dark:text-gray-200 transition-transform duration-300 ${
              isExpanded ? "rotate-[-180deg]" : ""
            }`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "mt-2 p-2" : "max-h-0"
          }`}>
          <p className="text-md whitespace-pre-wrap text-gray-800 dark:text-gray-100">
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const StatsDropdowns = ({ statsSection }: { statsSection: StatsSection }) => {
  const { titles, texts } = statsSection;
  const [expandedItem, setExpandedItem] = useState<number | null>(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggle = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchY = e.touches[0].clientY;
    const diff = touchY - touchStartRef.current;

    // Only activate on significant downward swipe
    if (diff > 10) {
      // Find which element is being touched
      const elements = document.elementsFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      );

      // Find the closest stat item
      const statItem = elements.find(
        (el) => el.classList.contains("group") && el.hasAttribute("data-index")
      );

      if (statItem) {
        const index = parseInt(statItem.getAttribute("data-index") || "-1");
        if (index !== -1 && index !== activeItem) {
          setActiveItem(index);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    setActiveItem(null);
  };

  const stats: Array<{
    title: string;
    content: string;
    icon: React.ReactNode;
    color: ColorType;
  }> = [
    {
      title: titles.favouriteThing,
      content: texts.favouriteThing,
      icon: <FiThumbsUp size={20} />,
      color: "blue" as ColorType,
    },
    {
      title: titles.leastFavouriteThing,
      content: texts.leastFavouriteThing,
      icon: <FiHeart size={20} />,
      color: "pink" as ColorType,
    },
    {
      title: titles.randomTalent,
      content: texts.randomTalent,
      icon: <FiStar size={20} />,
      color: "yellow" as ColorType,
    },
    {
      title: titles.favouriteShow,
      content: texts.favouriteShow,
      icon: <FiMonitor size={20} />,
      color: "purple" as ColorType,
    },
    {
      title: titles.longestBook,
      content: texts.longestBook,
      icon: <FiBook size={20} />,
      color: "green" as ColorType,
    },
    {
      title: titles.coffee,
      content: texts.coffee,
      icon: <FiClock size={20} />,
      color: "indigo" as ColorType,
    },
    {
      title: titles.hobbies,
      content: texts.hobbies,
      icon: <FiTrendingUp size={20} />,
      color: "red" as ColorType,
    },
    {
      title: titles.feats,
      content: texts.feats,
      icon: <FiAward size={20} />,
      color: "gray" as ColorType,
    },
  ];

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
      <style jsx global>{`
        @keyframes spin-once {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-once {
          animation: spin-once 0.6s ease-in-out;
        }
      `}</style>
      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}>
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            index={index}
            title={stat.title}
            content={stat.content}
            icon={stat.icon}
            color={stat.color}
            isExpanded={expandedItem === index}
            isActive={activeItem === index}
            onToggleExpand={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsDropdowns;
