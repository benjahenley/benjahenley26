import {
  FaInstagram,
  FaLinkedin,
  FaSoundcloud,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Locales } from "@/infraestructure/interfaces";
import { contents } from "@/data/contents/content";
import { IoLanguage } from "react-icons/io5";
import { SiBuymeacoffee } from "react-icons/si";

function getOptions(locale: Locales) {
  const items =
    contents[locale]?.ui?.leftbar?.items || contents["es"].ui.leftbar.items;

  const OPTIONS = [
    {
      logo: <CgProfile />,
      text: items[0],
      href: `/${locale}`,
    },
    {
      logo: <FaLinkedin />,
      text: items[1],
      href: "https://www.linkedin.com/in/benjamin-h-579b88146/",
    },
    {
      logo: <FaGithub />,
      text: items[2],
      href: "https://github.com/benjahenley",
    },
    {
      logo: <FaInstagram />,
      text: items[3],
      href: "https://www.instagram.com/benjahenley/",
    },
    {
      logo: <FaWhatsapp />,
      text: items[4],
      href: "https://wa.link/6qupmc",
    },
    {
      logo: <FaSoundcloud />,
      text: items[5],
      href: "/soundcloud",
    },
    {
      logo: <SiBuymeacoffee />,
      text: items[6],
      href: "https://www.buymeacoffee.com/benjahenley",
    },
  ];
  return OPTIONS;
}

export default getOptions;
