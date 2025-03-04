import contentEs from "@/data/contents/content-es.json";
import contentEn from "@/data/contents/content-en.json";

export type ContentType = typeof contentEs | typeof contentEn;
export type AboutSection = ContentType["pages"]["home"]["about"];

// You can also extract specific sections if needed
export type StatsSection = AboutSection["statsSection"];
export type ArtistSection = AboutSection["artistSection"];
export type SectionOne = AboutSection["sectionOne"];
