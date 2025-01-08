import React, { useState } from "react";
import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import { TECH_CATEGORIES } from "@/infraestructure/data/technologies/page";
import { SectionTitle, TextBase } from "../../ui/Texts";

type SkillsetProps = {
  className?: string;
  locale: Locales;
};

export default function Skillset({ className, locale }: SkillsetProps) {
  const { skillset } = contents[locale].pages.home;

  return (
    <div className={`${className} p-3`}>
      <SectionTitle className="mt-5 text-center mb-8">
        {skillset.title}
      </SectionTitle>
      {skillset.texts.map((text, index) => (
        <TextBase className="mb-6" key={index}>
          {text}
        </TextBase>
      ))}
      <SectionTitle className="text-center mb-10">Tech Stack</SectionTitle>
      <div className="flex flex-wrap justify-center gap-4 box-border">
        {TECH_CATEGORIES.map((category, index) => (
          <div
            key={index}
            className={`w-full lg:w-1/3 max-w-xs shadow-sm p-3 border border-transparent rounded-lg hover:border-yellow-200 hover:shadow-[0_0_12px_2px_rgba(255,223,0,0.8)] dark:hover:border-yellow-400 dark:hover:shadow-[0_0_10px_2px_rgba(255,215,0,0.6)] bg-gradient-to-br ${category.gradient} transition-transform transform hover:scale-[1.025]`}>
            <h4 className="text-xl text-gray-700 font-bold text-center mb-4">
              {category.title}
            </h4>
            <div className="flex flex-wrap justify-center gap-2 relative">
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
    </div>
  );
}

type TooltipProps = {
  children: React.ReactNode;
  name: string;
};

function Tooltip({ children, name }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow-md">
          {name}
        </div>
      )}
    </div>
  );
}
