import { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";
import { SectionTitle, SectionText } from "../Texts";

export interface SkillsetSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  icon?: ReactNode;
  gradientClasses?: string;
  contentClassName?: string;
}

export const SkillsetSection = ({
  title,
  description,
  children,
  icon = <FaMedal className="text-4xl relative z-10" />,
  gradientClasses = "from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400",
  contentClassName = "",
}: SkillsetSectionProps) => {
  return (
    <section className="mt-16 mb-10 relative z-10">
      <div className="p-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative">
              <div
                className={`absolute inset-0 rounded-full blur-sm animate-pulse`}></div>
              {icon}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            <SectionTitle className="text-center uppercase tracking-wider font-bold relative">
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientClasses}`}>
                {title}
              </span>
              <div
                className={`h-1 w-20 bg-gradient-to-r ${gradientClasses} rounded-full mx-auto mt-2`}></div>
            </SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto">
            <SectionText className="text-center text-lg mt-4">
              {description}
            </SectionText>
          </motion.div>
        </motion.div>
      </div>

      <div className={contentClassName}>{children}</div>
    </section>
  );
};
