import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "../../../../public/svgs";

import {
  FaLinkedin,
  FaInstagramSquare,
  FaGithubSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

export function Footer({ className }: any) {
  return (
    <div
      className={`${className} w-full py-8 dark:bg-[#2d3748] dark:text-white`}>
      <div className="grid place-items-center gap-2.5">
        <div className="flex space-x-2.5">
          <a
            href="https://www.instagram.com/benjahenley"
            className="w-10 h-10 grid place-items-center rounded"
            target="_blank"
            rel="noopener noreferrer">
            <FaInstagramSquare className="text-slate-700 dark:text-gray-300 hover:dark:text-white hover:scale-110 text-3xl" />
          </a>
          <a
            href="https://github.com/benjahenley"
            className="w-10 h-10 grid place-items-center rounded"
            target="_blank"
            rel="noopener noreferrer">
            <FaGithubSquare className="text-slate-700 dark:text-gray-300 hover:dark:text-white hover:scale-110 text-3xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/benjamin-h-579b88146/"
            className="w-10 h-10 grid place-items-center rounded"
            target="_blank"
            rel="noopener noreferrer">
            <FaLinkedin className="text-slate-700 dark:text-gray-300 hover:dark:text-white hover:scale-110 text-3xl" />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5491127398316&text=Hola!!%20Me%20comunico%20despues%20de%20ver%20tu%20incre%C3%ADble%20pagina%20de%20developer%20%F0%9F%91%8B%20%F0%9F%98%B5.%20Como%20est%C3%A1s%3F"
            className="w-10 h-10 grid place-items-center rounded"
            target="_blank"
            rel="noopener noreferrer">
            <FaWhatsappSquare className="text-slate-700 dark:text-gray-300 hover:dark:text-white hover:scale-110 text-3xl" />
          </a>
        </div>
        <div className="text-center">
          <span>
            Benja © <span>{new Date().getFullYear()}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
