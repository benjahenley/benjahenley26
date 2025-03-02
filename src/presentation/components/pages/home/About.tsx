"use client";

import "photoswipe/style.css";
import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import { SectionTitle, TextBase } from "../../ui/Texts";
import { ExpandableCardDemo } from "../../ui/ExpandableCardDemo";
import ProducerGallery from "../../ui/ProducerGallery";
import StatsCardTwo from "../../ui/StatsCardTwo";
import StatsDropdowns from "../../ui/StatsDropdowns";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  locale: Locales;
};

export default function About({ className, locale, style }: Props) {
  const aboutSection = contents[locale].pages.home.about;

  return (
    <div className={className + " p-3"} style={style}>
      <div className="flex flex-row items-center w-full m-auto justify-center mt-16 mb-5 gap-5 ">
        <SectionTitle className="text-center uppercase tracking-widest">
          {aboutSection.title}
        </SectionTitle>
      </div>
      {aboutSection.texts.slice(0, 2).map((item, key) => (
        <TextBase className="mb-4" key={key}>
          {item}
        </TextBase>
      ))}

      {/* <div className="flex flex-row items-center w-full m-auto justify-center mt-16 mb-10 gap-5">
        <SectionTitle className="text-center uppercase tracking-widest">
          {aboutSection.stats.title}
        </SectionTitle>
      </div> */}
      <StatsDropdowns aboutSection={aboutSection}></StatsDropdowns>

      <TextBase className="mt-10">{aboutSection.texts[2]}</TextBase>

      <StatsCardTwo aboutSection={aboutSection} locale={locale}></StatsCardTwo>

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
            {aboutSection.artistSection.title_top}
          </SectionTitle>
          <SectionTitle
            style={{ fontSize: "32px", lineHeight: "100%" }}
            className="text-left uppercase tracking-widest w-full">
            {aboutSection.artistSection.title_bottom}
          </SectionTitle>
        </div>
      </div>

      {aboutSection.artistSection.texts.map((item, key) => (
        <TextBase className="mb-4" key={key}>
          {item}
        </TextBase>
      ))}

      <ProducerGallery />

      <div className="flex flex-row items-center w-full m-auto justify-center mt-16 mb-10 gap-5">
        <SectionTitle className="text-center uppercase tracking-widest">
          {/* {aboutSection.music.title} */}
          {aboutSection.artistSection.myMusicTitle}
        </SectionTitle>
      </div>
      <ExpandableCardDemo locale={locale} />
    </div>
  );
}
