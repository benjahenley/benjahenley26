import { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";
import { SectionTitle, SectionText } from "./Texts";

export interface TitleWithDescriptionProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
  gradientClasses?: string;
  contentClassName?: string;
}

export const TitleWithDescription = ({
  title,
  description,
  children,
  contentClassName = "",
}: TitleWithDescriptionProps) => {
  return (
    <section className="mt-10 mb-10 relative z-10">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            <SectionTitle className="text-center uppercase tracking-wider font-bold relative">
              <span
                className={`bg-clip-text text-4xl md:text-5xl text-gray-800 dark:text-gray-100 `}>
                {title}
              </span>
            </SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto">
            <SectionText className="px-4 text-center text-sm md:text-base mt-4 text-gray-500 dark:text-gray-400 mb-5 max-w-xl text-pretty">
              {description}
            </SectionText>
          </motion.div>
        </motion.div>
      </div>

      <div className={contentClassName}>{children}</div>
    </section>
  );
};
