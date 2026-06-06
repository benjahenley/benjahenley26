import { TECH_CATEGORIES } from "@/infraestructure/data/TechCategories";
import { TitleWithDescription } from "../../shared/ui/TitleWithDescription";
import Tooltip from "../../shared/feedback/Tooltip";

export const TechStack = ({ textContent }: { textContent: any }) => {
  return (
    <TitleWithDescription
      title={textContent.title}
      description={textContent.description || ""}
      contentClassName="flex flex-wrap justify-center gap-4 box-border p-2">
      {TECH_CATEGORIES.map((category, index) => (
        <div
          key={index}
          className={`w-full max-w-sm lg:w-1/2 lg:max-w-xs shadow-md p-4 border border-transparent rounded-lg hover:border-white/20 hover:shadow-lg hover:shadow-current/20 bg-gradient-to-br ${category.gradient} opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-[1.025]`}>
          <h4 className="text-xl text-white font-bold text-center mb-4 drop-shadow-md">
            {category.title}
          </h4>
          <div className="flex flex-wrap justify-center gap-2.5 relative mx-auto max-w-[18rem]">
            {category.icons.map(({ icon, name }, idx) => (
              <Tooltip key={idx} name={name}>
                <div className="hover:rotate-6 hover:scale-110 transition-all duration-300 text-2xl text-black dark:text-white bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center w-12 h-12 hover:shadow-lg">
                  {icon}
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </TitleWithDescription>
  );
};
