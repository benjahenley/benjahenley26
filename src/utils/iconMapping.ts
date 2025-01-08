import {
  FaCcPaypal,
  FaReact,
  FaCss3,
  FaHtml5,
  FaGithub,
  FaAlgolia,
  FaDocker,
} from "react-icons/fa";
import { SiTypescript, SiPostman, SiStrapi, SiAirtable } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { BsBootstrapFill } from "react-icons/bs";

const iconMapping: any = {
  Paypal: FaCcPaypal,
  React: FaReact,
  CSS3: FaCss3,
  HTML5: FaHtml5,
  GitHub: FaGithub,
  Algolia: FaAlgolia,
  Docker: FaDocker,
  TypeScript: SiTypescript,
  Postman: SiPostman,
  Strapi: SiStrapi,
  Airtable: SiAirtable,
  "Next.js": RiNextjsFill,
  Tailwind: RiTailwindCssFill,
  Firebase: IoLogoFirebase,
  Vercel: IoLogoVercel,
  Bootstrap: BsBootstrapFill,
};

export default iconMapping;
