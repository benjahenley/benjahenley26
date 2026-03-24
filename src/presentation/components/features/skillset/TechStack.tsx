import { TECH_CATEGORIES } from "@/infraestructure/data/TechCategories";
import { FaMedal } from "react-icons/fa";
import { TitleWithDescription } from "../../shared/ui/TitleWithDescription";
import Tooltip from "../../shared/feedback/Tooltip";
import { useEffect, useState } from "react";

export const TechStack = ({ textContent }: { textContent: any }) => {
  const [isSingleColumn, setIsSingleColumn] = useState(false);

  // Detect when we're in single column mode
  useEffect(() => {
    const checkWidth = () => {
      setIsSingleColumn(window.innerWidth < 1024); // lg breakpoint is typically 1024px
    };

    // Initial check
    checkWidth();

    // Add listener for resize
    window.addEventListener("resize", checkWidth);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <TitleWithDescription
      title={textContent.title}
      description={textContent.description || ""}
      contentClassName="flex flex-wrap justify-center gap-4 box-border p-2">
      {TECH_CATEGORIES.map((category, index) => {
        // Alternate between left and right tilt
        const isEven = index % 2 === 0;
        const tiltAngle = isEven ? -5 : 5; // 5 degrees left or right
        const shiftAmount = isEven ? -4 : 4; // shift in px

        // Only apply tilt when in single column mode
        const tiltStyle = isSingleColumn
          ? {
              transform: `rotate(${tiltAngle}deg) translateX(${shiftAmount}px)`,
              transformOrigin: "center",
              margin: "16px 0", // Add some vertical spacing between tilted cards
              transition: "transform 0.2s ease-out", // Quick transition for hover effect
            }
          : {};

        return (
          <div
            key={index}
            style={tiltStyle}
            className={`w-full lg:w-1/2 lg:max-w-xs shadow-md p-4 border border-transparent rounded-lg hover:border-white/20 hover:shadow-lg hover:shadow-current/20 bg-gradient-to-br ${
              category.gradient
            } opacity-80 hover:opacity-100 transition-all duration-300 transform ${
              isSingleColumn
                ? "hover:rotate-0 hover:translate-x-0"
                : "hover:scale-[1.025]"
            }`}>
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
        );
      })}
    </TitleWithDescription>
  );
};
