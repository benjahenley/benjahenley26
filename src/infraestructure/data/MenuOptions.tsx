import { FaSpotify } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";
import { SiBuymeacoffee } from "react-icons/si";

import { GrShareOption } from "react-icons/gr";

function getOptions(locale: Locales) {
  const OPTIONS = [
    {
      logo: <CgProfile />,
      text: {
        en: "Profile",
        es: "Perfil",
      },
      href: `/${locale}`,
    },
    {
      logo: <FaSpotify />,
      text: {
        en: "Music",
        es: "Música",
      },
      href: "https://open.spotify.com/artist/6BzP9m9BqegCaCajUA4IEg",
    },
    {
      logo: <SiBuymeacoffee />,
      text: {
        en: "Coffee",
        es: "Cafesito",
      },
      href: "https://www.buymeacoffee.com/benjahenley",
    },
  ];
  return OPTIONS;
}

export default getOptions;

//
