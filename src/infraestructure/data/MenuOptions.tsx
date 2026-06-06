import { FaSpotify } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Locales } from "@/infraestructure/interfaces";

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
  ];
  return OPTIONS;
}

export default getOptions;

//
