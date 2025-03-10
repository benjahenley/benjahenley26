import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";

type Props = {
  locale: Locales;
  setSection: (section: string) => void;
  section: string;
};

export function OptionsMenu({ locale, section, setSection }: Props) {
  const options = contents[locale]?.ui?.optionsMenu?.options || [];

  return (
    <ul className="sticky top-0 bg-white dark:bg-gray-800 z-20 border-t border-b border-gray-300 dark:border-gray-600 font-bold flex justify-between items-center h-12 mt-2 text-center">
      {options.map(({ option, id }) => (
        <li
          key={id}
          onClick={() => setSection(id)}
          className={`text-sm md:text-base w-full h-full flex items-center justify-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-700 ${
            section === id
              ? "border-b-2 border-purple-700 dark:border-emerald-500"
              : ""
          }`}>
          {option}
        </li>
      ))}
    </ul>
  );
}
