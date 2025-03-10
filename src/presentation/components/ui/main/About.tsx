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
import ProducerGallery from "@/presentation/components/features/profile/ProducerGallery";
import { ExpandableCardDemo } from "@/presentation/components/shared/ui/cards/ExpandableCardDemo";
import { AboutSection } from "@/types/content";
import { FaMedal } from "react-icons/fa";
import { TitleWithDescription } from "../../shared/ui/TitleWithDescription";
import { useState } from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { LineSeparator } from "../../shared/ui/LineSeparator";
import ArtisticSection from "../../features/profile/ArtisticSection";
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
        <TitleWithDescription
          title={sectionOne.title}
          // description={sectionOne.description}
          icon={
            <FaMedal className="text-4xl dark:text-emerald-500  text-blue-900" />
          }
          gradientClasses="bg-gradient-to-r from-indigo-700 to-blue-900  dark:from-emerald-300 dark:to-green-500 text-transparent bg-clip-text">
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
        </TitleWithDescription>
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
