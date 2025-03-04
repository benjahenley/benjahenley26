import React from "react";
import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import { SoftSkills } from "../../features/skillset/SoftSkills";
import { TechStack } from "../../features/skillset/TechStack";
import { Achievements } from "../../features/skillset/Achievements";
import { LineSeparator } from "../../shared/ui/LineSeparator";

type SkillsetProps = {
  className?: string;
  locale: Locales;
};

export default function Skillset({ className, locale }: SkillsetProps) {
  const textContent = contents[locale].pages.home.skillset!;

  return (
    <div
      className={`${className ?? ""} flex flex-row max-w-full overflow-hidden`}>
      <div className="w-full relative">
        {/* Decorative Elements */}
        <div className="hidden md:block absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl z-0"></div>
        <div className="hidden md:block absolute top-1/3 -right-10 w-60 h-60 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl z-0"></div>

        <SoftSkills textContent={textContent.softSkills} />

        <LineSeparator className="max-w-4xl mx-auto opacity-50" />

        <TechStack textContent={textContent.techStack} />

        <LineSeparator className="max-w-4xl mx-auto opacity-50" />

        <Achievements textContent={textContent.achievements} />
      </div>
    </div>
  );
}
