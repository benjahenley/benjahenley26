import {
  FaReact,
  FaCss3,
  FaHtml5,
  FaGithub,
  FaAlgolia,
  FaDocker,
  FaAws,
  FaJenkins,
  FaSwift,
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
  SiClaude,
  SiNestjs,
  SiStripe,
} from "react-icons/si";
import { RiNextjsFill, RiPhpFill, RiTailwindCssFill } from "react-icons/ri";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { DiPostgresql } from "react-icons/di";
import { GrHeroku } from "react-icons/gr";
import { BsBootstrapFill } from "react-icons/bs";
import { TbBrandReactNative } from "react-icons/tb";

export const TECH_CATEGORIES = [
  {
    title: "Frontend",
    gradient: "from-blue-500/80 via-cyan-500/80 to-indigo-600/80",
    icons: [
      { icon: <FaReact />, name: "React" },
      { icon: <RiNextjsFill />, name: "Next.js" },
      { icon: <SiRedux />, name: "Redux" },
      { icon: <IoLogoVercel />, name: "Vercel" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <SiJavascript />, name: "JavaScript" },
      { icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend & Databases",
    gradient: "from-emerald-500/80 via-green-500/80 to-teal-600/80",
    icons: [
      { icon: <SiPrisma />, name: "Prisma" },
      { icon: <DiPostgresql />, name: "PostgreSQL" },
      { icon: <IoLogoFirebase />, name: "Firebase" },
      { icon: <GrHeroku />, name: "Heroku" },
      { icon: <FaAlgolia />, name: "Algolia" },
      { icon: <SiAirtable />, name: "Airtable" },
      { icon: <SiNestjs />, name: "Nest.js" },
      { icon: <RiPhpFill />, name: "PHP" },
    ],
  },
  {
    title: "APIs & Tools",
    gradient: "from-purple-500/80 via-fuchsia-500/80 to-violet-600/80",
    icons: [
      { icon: <SiPostman />, name: "Postman" },
      { icon: <SiGraphql />, name: "GraphQL" },
      { icon: <SiApollographql />, name: "Apollo Client" },
      { icon: <FaGithub />, name: "GitHub" },
    ],
  },
  {
    title: "Styling",
    gradient: "from-pink-400/80 via-rose-400/80 to-red-500/80",
    icons: [
      { icon: <SiSass />, name: "Sass" },
      { icon: <FaCss3 />, name: "CSS3" },
      { icon: <FaHtml5 />, name: "HTML5" },
      { icon: <BsBootstrapFill />, name: "Bootstrap" },
    ],
  },
  {
    title: "Containerization",
    gradient: "from-orange-400/80 via-amber-500/80 to-red-500/80",
    icons: [
      { icon: <FaDocker />, name: "Docker" },
      { icon: <FaAws />, name: "AWS" },
      { icon: <FaJenkins />, name: "Jenkins" },
    ],
  },
  {
    title: "AI Tools",
    gradient: "from-purple-600/80 via-indigo-500/80 to-blue-500/80",
    icons: [
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              fill="currentColor"
              d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
            />
          </svg>
        ),
        name: "ChatGPT",
      },
      {
        icon: <SiClaude />,
        name: "Claude",
      },
      {
        icon: (
          <svg
            height="1em"
            viewBox="0 0 24 24"
            width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <title>Cursor</title>
            <path
              d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z"
              fill="url(#lobe-icons-cursorundefined-fill-0)"></path>
            <path
              d="M22.35 18V6L11.925 0v12l10.425 6z"
              fill="url(#lobe-icons-cursorundefined-fill-1)"></path>
            <path
              d="M11.925 0L1.5 6v12l10.425-6V0z"
              fill="url(#lobe-icons-cursorundefined-fill-2)"></path>
            <path d="M22.35 6L11.925 24V12L22.35 6z" fill="#555"></path>
            <path d="M22.35 6l-10.425 6L1.5 6h20.85z" fill="#000"></path>
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="lobe-icons-cursorundefined-fill-0"
                x1="11.925"
                x2="11.925"
                y1="12"
                y2="24">
                <stop offset=".16" stop-color="#000" stop-opacity=".39"></stop>
                <stop offset=".658" stop-color="#000" stop-opacity=".8"></stop>
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="lobe-icons-cursorundefined-fill-1"
                x1="22.35"
                x2="11.925"
                y1="6.037"
                y2="12.15">
                <stop offset=".182" stop-color="#000" stop-opacity=".31"></stop>
                <stop offset=".715" stop-color="#000" stop-opacity="0"></stop>
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="lobe-icons-cursorundefined-fill-2"
                x1="11.925"
                x2="1.5"
                y1="0"
                y2="18">
                <stop stop-color="#000" stop-opacity=".6"></stop>
                <stop offset=".667" stop-color="#000" stop-opacity=".22"></stop>
              </linearGradient>
            </defs>
          </svg>
        ),
        name: "Cursor",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-6 h-6 ">
            <path fill="currentColor" d="M3 3h18v18H3V3m2 2v14h14V5H5z" />
          </svg>
        ),
        name: "Blackbox",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="w-6 h-6 ">
            <path
              fill="currentColor"
              d="M16 2v5h-5v5h-5v5H1v5h17.5c2.5 0 4.5-2 4.5-4.5V2h-7z"
            />
          </svg>
        ),
        name: "DALLE",
      },
    ],
  },
  {
    title: "Mobile Development",
    gradient: "from-teal-400/80 via-cyan-500/80 to-blue-600/80",
    icons: [
      { icon: <TbBrandReactNative />, name: "React Native" },
      { icon: <FaSwift />, name: "Swift" },
    ],
  },
  {
    title: "Other Tools",
    gradient: "from-gray-500/80 via-slate-500/80 to-gray-700/80",
    icons: [
      { icon: <FaCcPaypal />, name: "PayPal" },
      { icon: <SiStrapi />, name: "Strapi" },
      { icon: <SiReacthookform />, name: "React Form" },
      { icon: <SiFigma />, name: "Figma" },
      { icon: <SiStripe />, name: "Stripe" },
    ],
  },
];
