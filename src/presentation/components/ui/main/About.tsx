"use client";

import "photoswipe/style.css";
import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import {
  SectionTitle,
  TextBase,
} from "@/presentation/components/shared/ui/Texts";
import StatsDropdowns from "@/presentation/components/shared/ui/cards/StatsDropdowns";
import StatsCardTwo from "@/presentation/components/shared/ui/cards/StatsCardTwo";
import { AboutSection } from "@/types/content";
import { FaMedal } from "react-icons/fa";
import { TitleWithDescription } from "../../shared/ui/TitleWithDescription";
import { LineSeparator } from "../../shared/ui/LineSeparator";
import ArtisticSection from "../../features/profile/ArtisticSection";
import { motion } from "framer-motion";
type Props = {
  className?: string;
  style?: React.CSSProperties;
  locale: Locales;
};

export default function About({ className, locale, style }: Props) {
  const aboutSection: AboutSection = contents[locale].pages.home.about;

  const { sectionOne, artistSection, statsSection } = aboutSection;

  return (
    <div className={className} style={style}>
      <div className={className + " p-4"} style={style}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <SectionTitle className="mt-10 mb-10 text-center uppercase tracking-wider font-bold relative">
            <span
              className={`bg-clip-text text-4xl md:text-5xl text-gray-800 dark:text-gray-100 `}>
              {sectionOne.title}
            </span>
          </SectionTitle>
        </motion.div>
        {sectionOne.texts.slice(0, 1).map((item, key) => (
          <TextBase className="mb-4" key={key}>
            {item}
          </TextBase>
        ))}
        <StatsDropdowns statsSection={statsSection}></StatsDropdowns>
        <div className="mt-6">
          {sectionOne.texts.slice(1).map((item, key) => {
            return (
              <TextBase key={key} className="mb-6">
                {item}
              </TextBase>
            );
          })}
        </div>
      </div>

      <LineSeparator className="max-w-4xl mx-auto opacity-50" />

      <StatsCardTwo
        aboutSection={aboutSection.statsSection}
        locale={locale}></StatsCardTwo>

      <LineSeparator className="max-w-4xl mx-auto opacity-50" />

      <ArtisticSection locale={locale} artistSection={artistSection} />
    </div>
  );
}
