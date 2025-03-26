import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Locales } from "@/infraestructure/interfaces";
import Image from "next/image";

const stats = [
  {
    name: { es: "Energía", en: "Energy" },
    score: 5,
    emoji: "⚡",
    message: {
      es: "¡Siempre listo para nuevos desafíos con energía al máximo!",
      en: "Always ready for new challenges with maximum energy!",
    },
  },
  {
    name: { es: "Creatividad", en: "Creativity" },
    score: 5,
    emoji: "🎨",
    message: {
      es: "¡Transformando problemas en soluciones creativas!",
      en: "Turning problems into creative solutions!",
    },
  },
  {
    name: { es: "Velocidad", en: "Speed" },
    score: 4,
    emoji: "🚀",
    message: {
      es: "Rápido pero sin comprometer la calidad",
      en: "Fast but never compromising on quality",
    },
  },
  {
    name: { es: "Precisión", en: "Precision" },
    score: 5,
    emoji: "🎯",
    message: {
      es: "La atención al detalle es mi segunda naturaleza",
      en: "Attention to detail is my second nature",
    },
  },
  {
    name: { es: "Eficiencia", en: "Efficiency" },
    score: 4,
    emoji: "⏳",
    message: {
      es: "Optimizando cada proceso para obtener los mejores resultados",
      en: "Optimizing every process to achieve the best results",
    },
  },
  {
    name: { es: "Depuración", en: "Debugging" },
    score: 3,
    emoji: "🕵️",
    message: {
      es: "Mejorando constantemente mis habilidades de resolución de problemas",
      en: "Constantly improving my problem-solving abilities",
    },
  },
  {
    name: { es: "Colaboración", en: "Collaboration" },
    score: 4,
    emoji: "🤝",
    message: {
      es: "Trabajando en equipo para alcanzar objetivos comunes",
      en: "Working together to achieve common goals",
    },
  },
  {
    name: { es: "Resiliencia", en: "Resilience" },
    score: 4,
    emoji: "🔥",
    message: {
      es: "Superando desafíos con determinación y adaptabilidad",
      en: "Overcoming challenges with determination and adaptability",
    },
  },
  {
    name: { es: "Innovación", en: "Innovation" },
    score: 5,
    emoji: "💡",
    message: {
      es: "Siempre buscando nuevas formas de resolver problemas",
      en: "Always seeking new ways to solve problems",
    },
  },
  {
    name: { es: "Ejecución", en: "Execution" },
    score: 5,
    emoji: "✅",
    message: {
      es: "Convirtiendo ideas en realidad con precisión y eficacia",
      en: "Turning ideas into reality with precision and effectiveness",
    },
  },
  {
    name: { es: "Escalabilidad", en: "Scalability" },
    score: 2,
    emoji: "📈",
    message: {
      es: "En camino a dominar el arte de construir sistemas escalables",
      en: "On the path to mastering the art of building scalable systems",
    },
  },
];

type Props = {
  aboutSection: any;
  locale: Locales;
};

const TextBubble = ({
  message,
  isVisible,
}: {
  message: string;
  isVisible: boolean;
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="absolute z-20 top-10 right-2 transform text-center text-pretty -translate-y-[120%] overflow-visible">
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-slate-300 dark:from-gray-800 dark:via-gray-900 dark:to-slate-900 p-4 rounded-xl shadow-xl max-w-[250px] text-sm border border-gray-300/20 dark:border-emerald-500/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 dark:from-emerald-500/10 dark:to-green-500/5 blur-sm"></div>
            <div className="absolute top-1 right-1 w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 dark:from-emerald-500/10 dark:to-green-500/5 blur-xl"></div>
            <p className="text-gray-800 dark:text-gray-200 relative z-10 font-medium">
              {message}
            </p>
            {/* <Image
              src="/bubble.png"
              alt="bubble"
              width={40}
              height={40}
              className="absolute -bottom-6 right-5 z-10"
            /> */}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const StatsCardTwo = ({ aboutSection, locale }: Props) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState<number | null>(
    null
  );
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Track scroll position to detect if navbar is visible
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down, navbar is likely hidden
      // If scrolling up, navbar is likely visible
      setIsNavbarVisible(currentScrollY <= lastScrollY || currentScrollY < 50);

      // Close mobile panel when scrolling
      if (
        isMobileDetailOpen !== null &&
        Math.abs(currentScrollY - lastScrollY) > 10
      ) {
        setIsMobileDetailOpen(null);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileDetailOpen]);

  // Add a timeout to auto-dismiss the toast
  useEffect(() => {
    if (isMobileDetailOpen !== null) {
      const timer = setTimeout(() => {
        setIsMobileDetailOpen(null);
      }, 6000); // 6 seconds

      return () => clearTimeout(timer);
    }
  }, [isMobileDetailOpen]);

  // Generate different animation properties for each stat dot
  const getAnimationProps = (statIndex: number, dotIndex: number) => {
    // Create deterministic but varied animation properties
    const seed = statIndex * 10 + dotIndex;

    // Duration between 1.5s and 2.5s
    const duration = 1.5 + (seed % 11) / 10;

    // Delay between 3s and 15s (long recharge times)
    const delay = 10 + (seed % 13) * 0.9;

    // Different animation names based on position
    const animation =
      seed % 3 === 0
        ? "pulse-expand"
        : seed % 3 === 1
        ? "pulse-contract"
        : "pulse-both";

    return `${animation} ${duration}s ease-in-out ${delay}s infinite`;
  };

  const title = "DEV STATS";

  return (
    <div className="p-4 relative m-auto max-w-4xl mt-10 flex flex-col justify-center items-end xl:flex-row-reverse text-gray-800 dark:text-gray-200 rounded-xl">
      <style jsx global>{`
        @keyframes pulse-expand {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        @keyframes pulse-contract {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.9);
          }
        }

        @keyframes pulse-both {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.12);
          }
          60% {
            transform: scale(0.94);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        .stat-row {
          transition: all 0.2s ease;
        }

        .stat-row:hover {
          transform: translateX(5px);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .active-dot {
          box-shadow: 0 0 8px rgba(52, 211, 153, 0.5);
        }
      `}</style>

      {/* Image Container with Text Bubble */}
      <TextBubble
        message={
          (hoveredStat !== null && stats[hoveredStat]?.message?.[locale]) || ""
        }
        isVisible={hoveredStat !== null && window.innerWidth >= 1280}
      />
      <div
        className="m-auto xl:m-0 relative h-full w-full max-w-md md:h-auto  overflow-hidden flex items-end"
        style={{
          height: "calc(14rem + 30vw)",
          maxHeight: "450px",
        }}>
        <Image
          src="https://res.cloudinary.com/dfcfi3ozi/image/upload/v1740863854/Adobe_Express_-_file_hiawno.png"
          alt="Profile Picture"
          layout="fill"
          className="md:rounded-r-xl xl:scale-105 md:rounded-none rounded-b-xl object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Content Container with Gradient Background */}
      <div className="m-auto xl:m-0 flex flex-col justify-between max-w-md w-full h-full  p-6 bg-gradient-to-br from-purple-100 via-purple-200 to-gray-100  dark:from-slate-950 dark:via-slate-900 dark:to-gray-950 text-white rounded-lg xl:rounded-none xl:rounded-l-lg relative ">
        {/* Decorative Elements */}
        <div className="absolute top-5 right-5 w-32 h-32 rounded-full bg-gradient-to-br dark:from-emerald-500/10 dark:to-green-500/5 blur-2xl from-blue-500/30 to-indigo-500/5"></div>

        <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-gradient-to-tl dark:from-yellow-400/10 dark:to-emerald-500/5 blur-xl from-indigo-800/30 to-blue-500/5"></div>

        <div className="flex flex-col relative z-10">
          {/* Elegant Header */}
          <div className="flex flex-row items-center justify-between gap-4 mb-0 border-b border-gray-700/30 pb-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-900 dark:from-emerald-500 dark:to-emerald-700 text-transparent bg-clip-text">
              {title}
            </h2>
            <div
              className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-900 dark:from-emerald-500 dark:to-emerald-700 text-transparent bg-clip-text"
              style={{ animation: "glow 4s ease-in-out infinite" }}>
              ✷
            </div>
          </div>

          {/* Stats List with Improved Scrolling */}
          {/* <div className="space-y-2 h-full max-h-[350px] overflow-y-auto group pr-2 custom-scrollbar dark:custom-scrollbar-dark"> */}
          {
            <div className="space-y-2 h-full max-h-[350px] overflow-y-auto group pr-2 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-200 dark:scrollbar-thumb-emerald-400 dark:scrollbar-track-gray-800 ">
              {stats.map((stat, statIndex) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: statIndex * 0.05 }}
                    key={statIndex}
                    className="flex justify-between items-center p-2 transition-all duration-300 hover:bg-indigo-500/10 dark:hover:bg-white/5 rounded-md cursor-pointer"
                    onMouseEnter={() => setHoveredStat(statIndex)}
                    onMouseLeave={() => setHoveredStat(null)}
                    onClick={() => {
                      if (window.innerWidth < 1280) {
                        setIsMobileDetailOpen(statIndex);
                        setHoveredStat(statIndex);
                      }
                    }}>
                    <div className="flex flex-row items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full ,md:bg-gradient-to-br from-indigo-200 to-blue-900 dark:from-gray-700 dark:to-gray-800 ,md:dark:border md:border-gray-300/30 dark:border-gray-600/30">
                        <span className="text-lg">{stat.emoji}</span>
                      </div>
                      <div>
                        <span className="text-gray-800 dark:text-gray-200">
                          {stat.name[locale]}
                        </span>
                        <p
                          className={`text-sm font-bold ${
                            stat.score <= 2
                              ? "text-purple-300 dark:text-emerald-800" // Low scores
                              : stat.score === 3
                              ? "text-purple-400 dark:text-emerald-700" // Mid scores
                              : stat.score === 4
                              ? "text-purple-500 dark:text-emerald-500" // Good scores
                              : "text-purple-700 dark:text-emerald-300" // Best scores
                          }`}>
                          {stat.score}/5
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`
                        w-3 h-3 rounded-sm
                        ${
                          dotIndex < stat.score
                            ? "bg-gradient-to-br from-indigo-700 to-blue-900 dark:from-green-300 dark:to-emerald-500 group-hover:scale-110 group-hover:rotate-[360deg] dark:shadow-[0_0_8px_rgba(52,211,153,0.5)] shadow-[0_0_8px_rgba(192,38,211,0.5)]"
                            : "bg-blue-300 dark:bg-gray-700/50"
                        }
                      `}
                          style={{
                            animation:
                              dotIndex < stat.score
                                ? getAnimationProps(statIndex, dotIndex)
                                : "none",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          }
        </div>

        {/* Elegant Footer */}
        <div className="flex flex-row items-center justify-between gap-4 pt-3 border-t border-gray-700/30 relative z-10">
          <div
            className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-900 dark:from-emerald-500 dark:to-emerald-700 text-transparent bg-clip-text"
            style={{ animation: "glow 4s ease-in-out infinite" }}>
            ✷
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-900 dark:from-emerald-500 dark:to-emerald-700 text-transparent bg-clip-text">
              {title}
            </h2>
            <div className="text-xs text-gray-400 text-right">
              Updated regularly
            </div>
          </div>
        </div>

        {/* Toast Notification - Centered in main component with flexbox */}
        <AnimatePresence>
          {stats.map(
            (stat, index) =>
              isMobileDetailOpen === index &&
              hoveredStat === index && (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", bounce: 0.3 },
                  }}
                  exit={{
                    y: 50,
                    opacity: 0,
                    transition: { duration: 0.2 },
                  }}
                  className={`fixed bottom-2 z-[100] left-0 right-0 flex justify-center items-center ${
                    isNavbarVisible ? "mb-[80px] md:mb-[90px]" : "mb-[30px]"
                  } z-[60]`}>
                  <div
                    className="max-w-[90%] px-5 py-3
                    bg-gradient-to-r from-violet-500/90 to-indigo-600/90 dark:from-green-500/90 dark:to-emerald-600/90 
                    rounded-full shadow-xl text-white flex items-center gap-4
                    border border-white/20 ">
                    <div className="text-2xl">{stat.emoji}</div>
                    <p className="text-sm font-medium text-white pr-2">
                      {stat.message[locale]}
                    </p>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatsCardTwo;
