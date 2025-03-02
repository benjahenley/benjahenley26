import { TECH_CATEGORIES } from "@/infraestructure/data/technologies/page";
import { FaMedal } from "react-icons/fa";
import Tooltip from "../Tooltip";
import { SkillsetSection } from "./SkillsetSection";

export const TechStack = ({ textContent }: { textContent: any }) => {
  return (
    <SkillsetSection
      title={textContent.title}
      description={textContent.description}
      icon={
        <FaMedal className="text-4xl text-purple-600 dark:text-purple-400 relative z-10" />
      }
      // iconColor="from-purple-700 via-pink-600 to-purple-700 dark:from-purple-400 dark:via-pink-300 dark:to-purple-400"
      gradientClasses="from-purple-700 via-pink-600 to-purple-700 dark:from-purple-400 dark:via-pink-300 dark:to-purple-400"
      contentClassName="flex flex-wrap justify-center gap-4 box-border p-2">
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
                <div className="hover:rotate-6 hover:scale-105 text-3xl text-black dark:text-white bg-white dark:bg-gray-600 rounded-full shadow-md flex items-center justify-center w-14 h-14 hover:shadow-black">
                  {icon}
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </SkillsetSection>
  );
};
