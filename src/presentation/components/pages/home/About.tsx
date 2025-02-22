"use client";

import "photoswipe/style.css";
import { useEffect, useState } from "react";
import { contents } from "@/data/contents/content";
import { ImageType, Locales } from "@/infraestructure/interfaces";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { SectionTitle, TextBase } from "../../ui/Texts";
import { ExpandableCardDemo } from "../../ui/ExpandableCardDemo";
import { FaMedal } from "react-icons/fa";
import StatsCard from "../../ui/StatsCard";
import ProducerGallery from "../../ui/ProducerGallery";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  locale: Locales;
};

export default function About({ className, locale, style }: Props) {
  const aboutSection = contents[locale].pages.home.about;

  return (
    <div className={className + " p-3"} style={style}>
      <div className="flex flex-row items-center w-full m-auto justify-center mt-10 mb-5 gap-5 ">
        <SectionTitle className="text-center uppercase tracking-widest">
          {aboutSection.title}
        </SectionTitle>
      </div>

      {aboutSection.texts.map((item, key) => (
        <TextBase className="mb-4" key={key}>
          {item}
        </TextBase>
      ))}

      <div className="flex flex-row items-center w-full m-auto justify-center mt-10 mb-5 gap-5">
        <SectionTitle className="text-center uppercase tracking-widest">
          {aboutSection.stats.title}
        </SectionTitle>
      </div>
      <StatsCard aboutSection={aboutSection}></StatsCard>

      <div className="flex flex-row items-center w-full m-auto justify-center mt-10 mb-5 gap-5">
        <SectionTitle className="text-center uppercase tracking-widest">
          {aboutSection.artistSection.title}
        </SectionTitle>
      </div>

      {aboutSection.artistSection.texts.map((item, key) => (
        <TextBase className="mb-4" key={key}>
          {item}
        </TextBase>
      ))}

      <ProducerGallery />

      <div className="flex flex-row items-center w-full m-auto justify-center mt-10 mb-5 gap-5">
        <SectionTitle className="text-center uppercase tracking-widest">
          {/* {aboutSection.music.title} */}
          My music
        </SectionTitle>
      </div>
      <ExpandableCardDemo locale={locale} />
    </div>
  );
}
