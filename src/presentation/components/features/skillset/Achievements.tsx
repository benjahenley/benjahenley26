import { motion } from "framer-motion";
import { TitleWithDescription } from "../../shared/ui/TitleWithDescription";

const achievements = [
  {
    key: "clientSatisfaction",
    gradient:
      "from-gray-100 via-purple-50 to-gray-200 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900",
    glow: "bg-purple-300/20",
    badge: "from-purple-500 to-indigo-500",
  },
  {
    key: "projectsDelivered",
    gradient:
      "from-gray-100 via-indigo-50 to-gray-200 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900",
    glow: "bg-indigo-300/20",
    badge: "from-indigo-500 to-violet-500",
  },
  {
    key: "codeEfficiency",
    gradient:
      "from-gray-100 via-violet-50 to-gray-200 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900",
    glow: "bg-violet-300/20",
    badge: "from-violet-500 to-indigo-500",
  },
  {
    key: "education",
    gradient:
      "from-gray-100 via-gray-50 to-gray-200 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900",
    glow: "bg-gray-300/20",
    badge: "from-gray-600 to-gray-700",
    fullWidth: true,
  },
  {
    key: "careerMilestone",
    gradient:
      "from-gray-100 via-emerald-50 to-gray-200 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900",
    glow: "bg-emerald-300/20",
    badge: "from-emerald-500 to-teal-500",
    fullWidth: true,
  },
];

export const Achievements = ({ textContent }: { textContent: any }) => {
  return (
    <TitleWithDescription
      title={textContent.title}
      description={textContent.description}
      contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
      {/** Achievement Cards **/}
      {achievements.map(({ key, gradient, glow, badge, fullWidth }, index) => (
        <motion.div
          key={key}
          className={`bg-gradient-to-br ${gradient} p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm 
            ${fullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className="flex justify-center mb-4 relative">
            <div
              className={`absolute inset-0 ${glow} rounded-full blur-xl animate-pulse`}></div>
            <div
              className={`w-20 h-20 bg-gradient-to-br ${badge} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10`}>
              <span>
                {textContent[key].value || textContent[key].percentage || "🎖️"}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-3">
            {textContent[key].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {textContent[key].description}
          </p>
        </motion.div>
      ))}
    </TitleWithDescription>
  );
};
