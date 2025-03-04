import { motion, AnimatePresence } from "framer-motion";
import { FaMedal, FaStar } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TextBase } from "../../shared/ui/Texts";
import { useState } from "react";
import { SkillsetSection } from "./SkillsetSection";

export const SoftSkills = ({ textContent }: { textContent: any }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SkillsetSection
      title={textContent.title}
      description={textContent.description}
      contentClassName="flex flex-col items-center justify-center w-full gap-5 py-6 md:px-4 max-w-4xl mx-auto">
      {textContent.texts.map((step: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative flex flex-col items-start justify-between w-full px-3 cursor-pointer">
          <div
            className="group flex flex-row items-center justify-between text-left w-full p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all"
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }>
            <div className="flex flex-row w-full items-center justify-between gap-3 md:gap-4">
              <motion.div
                whileHover={{
                  rotate: [0, -5, 5, -5, 0],
                  scale: 1.1,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 inline-flex items-center justify-center rounded-xl transition-all cursor-pointer shadow-md
                    ${
                      activeIndex === index
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    }`}>
                <span
                  className={`text-2xl leading-none transition-all duration-300 ${
                    activeIndex === index
                      ? "text-white scale-125"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  style={{ lineHeight: 1 }}>
                  {step.emoji}
                </span>
              </motion.div>
              <div>
                <p className="group-hover:font-bold text-md md:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-200 transition-all duration-300">
                  {step.title}
                </p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <motion.div
                      key={starIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: starIndex * 0.05 + index * 0.03,
                        },
                      }}>
                      <FaStar
                        className={`text-sm ${
                          activeIndex === index
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="ml-auto">
                <motion.div
                  animate={{ rotate: activeIndex === index ? 0 : -90 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 shadow-sm">
                  <MdKeyboardArrowDown className="text-xl text-gray-700 dark:text-gray-300" />
                </motion.div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2 pl-16 pr-4 w-full text-left text-gray-700 dark:text-gray-300 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 border border-gray-200 dark:border-gray-700 shadow-md">
                  <TextBase className="text-base">{step.description}</TextBase>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </SkillsetSection>
  );
};
