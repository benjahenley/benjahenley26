import { TECH_CATEGORIES } from "@/infraestructure/data/technologies/page";
import { FaMedal } from "react-icons/fa";
import { SkillsetSection } from "./SkillsetSection";
import Tooltip from "../../shared/feedback/Tooltip";

export const TechStack = ({ textContent }: { textContent: any }) => {
  return (
    <SkillsetSection
      title={textContent.title}
      description={textContent.description || ""}
      contentClassName="flex flex-wrap justify-center gap-4 box-border p-2">
      {TECH_CATEGORIES.map((category, index) => (
        <div
          key={index}
          className={`w-full lg:w-1/2 max-w-xs shadow-md p-4 border border-transparent rounded-lg hover:border-white/20 hover:shadow-lg hover:shadow-current/20 bg-gradient-to-br ${category.gradient} transition-all duration-300 transform hover:scale-[1.025] `}>
          <h4 className="text-xl text-white font-bold text-center mb-4 drop-shadow-md">
            {category.title}
          </h4>
          <div className="flex flex-wrap wrap-balanced justify-center gap-3 relative">
            {category.icons.map(({ icon, name }, idx) => (
              <Tooltip key={idx} name={name}>
                <div className="hover:rotate-6 hover:scale-110 transition-all duration-300 text-3xl text-black dark:text-white bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center w-14 h-14 hover:shadow-lg">
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
