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
import { SkillsetSection } from "@/presentation/components/features/skillset/SkillsetSection";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  locale: Locales;
};

export default function About({ className, locale, style }: Props) {
  const aboutSection: AboutSection = contents[locale].pages.home.about;

  const { sectionOne, artistSection, statsSection } = aboutSection;

  return (
    <div className={className + " p-3"} style={style}>
      <SkillsetSection
        title={sectionOne.title}
        // description={sectionOne.description}
        icon={
          <FaMedal className="text-4xl dark:text-emerald-500  text-purple-600" />
        }
        gradientClasses="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700  dark:from-emerald-300 dark:to-green-500 text-transparent bg-clip-text"
        contentClassName="flex flex-col items-center justify-center w-full py-6 md:px-4 max-w-4xl mx-auto">
        {sectionOne.texts.slice(0, 2).map((item, key) => (
          <TextBase className="mb-4" key={key}>
            {item}
          </TextBase>
        ))}
        <StatsDropdowns statsSection={statsSection}></StatsDropdowns>
        <TextBase className="mt-10">{sectionOne.texts[2]}</TextBase>
        <TextBase className="mt-10">{sectionOne.texts[3]}</TextBase>
      </SkillsetSection>

      {/* <div className="flex flex-row items-center w-full m-auto justify-center mt-16 mb-10 gap-5">
        <SectionTitle className="text-center uppercase tracking-widest">
          {aboutSection.stats.title}
        </SectionTitle>
      </div> */}

      <StatsCardTwo
        aboutSection={aboutSection.statsSection}
        locale={locale}></StatsCardTwo>

      <div className="flex flex-row items-center w-full max-w-[100vw] m-auto justify-start mt-16 mb-10 gap-2 md:gap-5 md:max-w-2xl">
        <div className="flex flex-col items-end m-auto justify-center gap-2 w-full max-w-[40vw]">
          <div className="dark:bg-white bg-gray-800 w-24 h-4 max-w-[20vw] relative"></div>
          <div className="dark:bg-white bg-gray-800 w-full h-5 md:max-w-36  max-w-[30vw]"></div>
          <div className="dark:bg-white bg-gray-800 w-full h-3 md:max-w-48  max-w-[40vw]"></div>
        </div>
        <div className="flex flex-col items-center w-full m-auto justify-center gap-0 max-w-xs">
          <SectionTitle
            style={{ fontSize: "45px", lineHeight: "100%" }}
            className="text-left uppercase tracking-widest w-full">
            {artistSection.title_top}
          </SectionTitle>
          <SectionTitle
            style={{ fontSize: "32px", lineHeight: "100%" }}
            className="text-left uppercase tracking-widest w-full">
            {artistSection.title_bottom}
          </SectionTitle>
        </div>
      </div>

      {artistSection.texts.map((item, key) => (
        <TextBase className="mb-4" key={key}>
          {item}
        </TextBase>
      ))}

      <ProducerGallery />

      <div className="flex flex-row items-center w-full m-auto justify-center mt-16 mb-10 gap-5">
        <SectionTitle className="text-center uppercase tracking-widest">
          {/* {aboutSection.music.title} */}
          {artistSection.myMusicTitle}
        </SectionTitle>
      </div>
      <ExpandableCardDemo locale={locale} />
    </div>
  );
}
