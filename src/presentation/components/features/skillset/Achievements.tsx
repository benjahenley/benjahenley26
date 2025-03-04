import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";
import { SkillsetSection } from "./SkillsetSection";

export const Achievements = ({ textContent }: { textContent: any }) => {
  return (
    <SkillsetSection
      title={textContent.title}
      description={textContent.description}
      contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
      {/* Client Satisfaction Card */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <div className="flex justify-center mb-4 relative">
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
            <span>{textContent.clientSatisfaction.percentage}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-3">
          {textContent.clientSatisfaction.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          {textContent.clientSatisfaction.description}
        </p>
      </motion.div>

      {/* Projects Delivered Card */}
      <motion.div
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <div className="flex justify-center mb-4 relative">
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
            <span>{textContent.projectsDelivered.value}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-3">
          {textContent.projectsDelivered.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          {textContent.projectsDelivered.description}
        </p>
      </motion.div>

      {/* Code Efficiency Card */}
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <div className="flex justify-center mb-4 relative">
          <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
            <span>{textContent.codeEfficiency.percentage}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-3">
          {textContent.codeEfficiency.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          {textContent.codeEfficiency.description}
        </p>
      </motion.div>

      {/* Education textContent Card */}
      <motion.div
        className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-3 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5 md:gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-full flex items-center justify-center text-4xl shadow-lg relative z-10">
              <span>🎓</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {textContent.education.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {textContent.education.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Career Milestone Card */}
      <motion.div
        className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-3 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5 md:gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center text-4xl shadow-lg relative z-10">
              <span>🚀</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {textContent.careerMilestone.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {textContent.careerMilestone.description}
            </p>
          </div>
        </div>
      </motion.div>
    </SkillsetSection>
  );
};
