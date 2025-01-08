import {
  FaReact,
  FaCss3,
  FaHtml5,
  FaGithub,
  FaAlgolia,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";
import {
  SiTypescript,
  SiRedux,
  SiPostman,
  SiStrapi,
  SiAirtable,
  SiSass,
  SiReacthookform,
  SiPrisma,
  SiGraphql,
  SiApollographql,
  SiFigma,
  SiJavascript,
} from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { DiPostgresql } from "react-icons/di";
import { GrHeroku } from "react-icons/gr";
import { BsBootstrapFill } from "react-icons/bs";

export const TECH_CATEGORIES = [
  {
    title: "Frontend",
    gradient: "from-pink-200 via-purple-300 to-blue-200",
    icons: [
      { icon: <FaReact />, name: "React" },
      { icon: <RiNextjsFill />, name: "Next.js" },
      { icon: <SiRedux />, name: "Redux" },
      { icon: <IoLogoVercel />, name: "Vercel" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <SiJavascript />, name: "JavaScript" },
    ],
  },
  {
    title: "Backend & Databases",
    gradient: "from-yellow-200 via-orange-300 to-red-200",
    icons: [
      { icon: <SiPrisma />, name: "Prisma" },
      { icon: <DiPostgresql />, name: "PostgreSQL" },
      { icon: <IoLogoFirebase />, name: "Firebase" },
      { icon: <GrHeroku />, name: "Heroku" },
      { icon: <FaAlgolia />, name: "Algolia" },
      { icon: <SiAirtable />, name: "Airtable" },
    ],
  },
  {
    title: "APIs & Tools",
    gradient: "from-cyan-200 via-blue-300 to-indigo-200",
    icons: [
      { icon: <SiPostman />, name: "Postman" },
      { icon: <SiGraphql />, name: "GraphQL" },
      { icon: <SiApollographql />, name: "Apollo Client" },
      { icon: <FaGithub />, name: "GitHub" },
    ],
  },
  {
    title: "Styling",
    gradient: "from-green-200 via-teal-300 to-blue-200",
    icons: [
      { icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
      { icon: <SiSass />, name: "Sass" },
      { icon: <FaCss3 />, name: "CSS3" },
      { icon: <FaHtml5 />, name: "HTML5" },
      { icon: <BsBootstrapFill />, name: "Bootstrap" },
    ],
  },
  {
    title: "Containerization",
    gradient: "from-orange-100 via-pink-200 to-purple-300",
    icons: [
      { icon: <FaDocker />, name: "Docker" },
      { icon: <FaAws />, name: "AWS" },
    ],
  },
  {
    title: "Other Tools",
    gradient: "from-lime-200 via-green-300 to-emerald-200",
    icons: [
      { icon: <FaCcPaypal />, name: "PayPal" },
      { icon: <SiStrapi />, name: "Strapi" },
      { icon: <SiReacthookform />, name: "React Form" },
      { icon: <SiFigma />, name: "Figma" },
    ],
  },
];
