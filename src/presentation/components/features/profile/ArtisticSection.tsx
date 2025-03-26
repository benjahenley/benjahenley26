import { Locales } from "@/infraestructure/interfaces/locales";
import { SectionTitle } from "../../shared/ui/Texts";

import { TextBase } from "../../shared/ui/Texts";
import ProducerGallery from "./ProducerGallery";
import { ExpandableCardDemo } from "../../shared/ui/cards/ExpandableCardDemo";

export default function ArtistSection({
  artistSection,
  locale,
}: {
  artistSection: any;
  locale: Locales;
}) {
  return (
    <div className="p-4">
      <div className="flex flex-row items-center w-full max-w-[100vw] m-auto justify-start mt-6 mb-10 gap-2 md:gap-5 md:max-w-2xl">
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

      {artistSection.texts.map((item: string, key: number) => (
        <TextBase className="mb-4" key={key}>
          {item}
        </TextBase>
      ))}

      <ProducerGallery />
      <div className="flex flex-row items-center w-full m-auto justify-center mt-16 mb-10 gap-5">
        <SectionTitle className="mt-10 mb-10 text-center uppercase tracking-wider font-bold relative">
          <span
            className={`bg-clip-text text-4xl md:text-5xl text-gray-800 dark:text-gray-100 `}>
            {artistSection.myMusicTitle}
          </span>
        </SectionTitle>
      </div>
      <ExpandableCardDemo locale={locale} />
    </div>
  );
}
