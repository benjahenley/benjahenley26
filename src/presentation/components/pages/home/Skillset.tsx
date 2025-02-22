import React, { useState } from "react";
import Tooltip from "../../ui/Tooltip";
import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import { TECH_CATEGORIES } from "@/infraestructure/data/technologies/page";
import { SectionText, SectionTitle, TextBase } from "../../ui/Texts";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleRight, FaMedal, FaStar } from "react-icons/fa";
import { LineSeparator } from "../../ui/LineSeparator";
import { MdKeyboardArrowDown } from "react-icons/md";

type SkillsetProps = {
  className?: string;
  locale: Locales;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const starVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export default function Skillset({ className, locale }: SkillsetProps) {
  const skillset = contents[locale].pages.home.skillset!;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div
      className={`${className ?? ""} flex flex-row max-w-full overflow-hidden`}>
      {/* <TracingBeam className="w-fit flex px-2"> */}
      <div className="w-full">
        <section className="mt-16 mb-10 w-full">
          <div className="p-2 md:px-4 max-w-full">
            <div className="flex flex-row items-center w-full m-auto justify-center mb-5 gap-5 max-w-full">
              <FaMedal className="h-full text-2xl text-gray-800 dark:text-gray-100" />
              <SectionTitle className="text-center uppercase tracking-widest">
                {skillset.title}
              </SectionTitle>
              <FaMedal className="h-full text-2xl text-gray-800 dark:text-gray-100" />
            </div>

            <SectionText className="text-center">
              {skillset.description}
            </SectionText>
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-4 py-4 md:px-2">
            {skillset.texts.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-start justify-start w-full px-3 cursor-pointer">
                <div
                  className="group flex flex-row items-center justify-between text-left w-full"
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }>
                  <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
                    <div
                      className={` w-12 h-12 inline-flex items-center justify-center rounded-full transition-all cursor-pointer 
                ${
                  activeIndex === index
                    ? ""
                    : "bg-white dark:bg-gray-800 border-gray-400"
                }`}>
                      <span
                        className={` text-2xl group-hover:scale-110 leading-none opacity-90 text-shadow  ${
                          activeIndex === index &&
                          "scale-125 group-hover:scale-125  opacity-100"
                        }`}
                        style={{ lineHeight: 1 }}>
                        {step.emoji}
                      </span>
                    </div>
                    <p className="group-hover:font-bold text-shadow text-md md:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {step.title}
                    </p>
                    <div className="hidden md:flex">
                      <MdKeyboardArrowDown
                        className={`text-2xl md:hidden xl:block transform transition-transform ${
                          activeIndex === index ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                    </div>
                  </div>
                  <motion.div
                    className="sm:flex flex-row gap-2 text-sm hidden md:text-xl text-gray-700 dark:text-gray-300"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    {[...Array(5)].map((_, starIndex) => (
                      <motion.div key={starIndex} variants={starVariants}>
                        <FaStar
                          className={
                            activeIndex === index
                              ? " text-yellow-300 text-shadow"
                              : "text-gray-800 dark:text-gray-300 text-shadow"
                          }
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0.1, height: 0 }}
                    animate={{ opacity: 1, height: "100%" }}
                    exit={{ opacity: 0, height: 1 }}
                    transition={{ duration: 0.9 }}
                    className="mt-3 p-4 w-full text-left text-gray-700 dark:text-gray-300 rounded-lg  overflow-hidden">
                    <TextBase
                      className={`italic p-3 rounded-lg shadow-lg ${
                        activeIndex === index &&
                        "bg-grat-300 bg-slate-100 dark:bg-gray-700"
                      }`}>
                      {step.description}
                    </TextBase>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>
        <LineSeparator></LineSeparator>
        <section className="mt-16 mb-10">
          <div className="p-2 md:px-4">
            <div className="flex flex-row items-center w-full m-auto justify-center mb-5 gap-5">
              <FaMedal className="h-full text-2xl text-gray-800 dark:text-gray-100" />
              <SectionTitle className="text-center uppercase tracking-widest">
                {skillset.techStack.title}
              </SectionTitle>
              <FaMedal className="h-full text-2xl text-gray-800 dark:text-gray-100" />
            </div>
            <SectionText className="mb-2 text-center text-balance">
              {skillset.techStack.description}
            </SectionText>
          </div>
          <div className="flex flex-wrap justify-center gap-4 box-border p-2">
            {TECH_CATEGORIES.map((category, index) => (
              <div
                key={index}
                className={`w-full lg:w-1/3 max-w-xs shadow-sm p-3 border border-transparent rounded-lg hover:border-yellow-200 hover:shadow-[0_0_12px_2px_rgba(255,223,0,0.8)] dark:hover:border-yellow-400 dark:hover:shadow-[0_0_10px_2px_rgba(255,215,0,0.6)] bg-gradient-to-br ${category.gradient} transition-transform transform hover:scale-[1.025]`}>
                <h4 className="text-xl text-gray-900 font-bold text-center mb-4">
                  {category.title}
                </h4>
                <div className="flex flex-wrap wrap-balanced justify-center gap-2 relative">
                  {category.icons.map(({ icon, name }, idx) => (
                    <Tooltip key={idx} name={name}>
                      <div className="hover:rotate-6 hover:scale-105  text-3xl text-black dark:text-white bg-white dark:bg-gray-600 rounded-full shadow-md flex items-center justify-center w-14 h-14 hover:shadow-black">
                        {icon}
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* </TracingBeam> */}
    </div>
  );
}
