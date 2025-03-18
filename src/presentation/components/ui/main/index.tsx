"use client";

import { feedOptions } from "@/atoms/feed";
import { MdVerified } from "react-icons/md";
import { contents } from "@/data/contents/content";
import { Locales } from "@/infraestructure/interfaces";
import { useAtom } from "jotai";
import { FaCakeCandles } from "react-icons/fa6";
import {
  FaCalendarAlt,
  FaDownload,
  FaExternalLinkSquareAlt,
  FaLink,
} from "react-icons/fa";
import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import ProfilePic from "@/presentation/components/features/profile/MyProfilePic";
import { FollowButtonHome } from "@/presentation/components/shared/ui/buttons/FollowButton";
import { PriceText, TextBase } from "@/presentation/components/shared/ui/Texts";
import { OptionsMenu } from "@/presentation/components/shared/ui/SectionMenu";
import { SpinnerContainer } from "@/presentation/components/shared/feedback/SpinnerContainer";
import { Footer } from "@/presentation/components/shared/ui/Footer";
import NavbarMobile from "@/presentation/components/shared/ui/NavbarMobile";
import { BoxesCore } from "@/presentation/components/shared/ui/Background-boxes";
import Leftbar, { LeftbarRefType } from "@/presentation/components/ui/leftbar";
import RightBar from "@/presentation/components/ui/rightbar";
import Link from "next/link";
import { IoLinkOutline } from "react-icons/io5";

const Feed = dynamic(() => import("./Feed"), { suspense: true, ssr: true });
const About = dynamic(() => import("./About"), { suspense: true, ssr: false });
const Projects = dynamic(() => import("./Projects"), {
  suspense: true,
  ssr: true,
});
const Skillset = dynamic(() => import("./Skillset"), { suspense: false });

type Props = {
  locale: Locales;
};

export default function HomeComp({ locale }: Props) {
  const [section, setSection] = useAtom(feedOptions);
  const home = contents[locale]?.pages?.home || contents["es"].pages.home;
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const cvModalRef = useRef<HTMLDivElement>(null);
  const leftbarRef = useRef<LeftbarRefType>(null);

  // Function to toggle the mobile menu directly through the ref
  const toggleMobileMenu = () => {
    if (leftbarRef.current) {
      leftbarRef.current.toggleMobileMenu();
    }
  };

  // CV image URL
  const cvImageUrl =
    "https://res.cloudinary.com/dfcfi3ozi/image/upload/v1742247540/Benja_Henley_Fullstack_CV_.pdf_page-0001_akamf0.jpg";
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cvModalRef.current &&
        !cvModalRef.current.contains(event.target as Node)
      ) {
        setCvModalOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCvModalOpen(false);
      }
    };

    if (cvModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "";
    };
  }, [cvModalOpen]);

  const openCvModal = () => {
    setCvModalOpen(true);
  };

  const closeCvModal = () => {
    setCvModalOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-white dark:bg-[#1f2937]">
      <div className="flex w-full h-full max-w-screen-2xl">
        <aside className="relative h-[100vh] hidden md:block md:w-[10vw] xl:w-[20vw] 2xl:w-[15vw] p-0 m-0 bg-white dark:bg-[#1f2937]">
          <Leftbar locale={locale} ref={leftbarRef} />
        </aside>

        {/* Mobile version of Leftbar - will only display content when mobile menu is open */}
        <div className="md:hidden">
          <Leftbar locale={locale} ref={leftbarRef} />
        </div>

        <main className="relative m-0 lg:m-0 w-auto flex-1 border-l min-h-screen border-r border-gray-300 dark:border-gray-600">
          <header className="border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] dark:text-white w-full  mx-0 md:mx-auto lg:mx-0">
            <div className=" mx-auto ">
              {/* <FollowerPointerCard> */}
              <div className="flex justify-center items-center h-[250px] sm:h-[250px] md:h-[200px] lg:h-[300px] overflow-hidden relative">
                <BoxesCore className="w-full h-full"></BoxesCore>
              </div>
              {/* </FollowerPointerCard> */}
              <div className="px-2 md:px-3 relative">
                <div className="flex flex-row overflow-visible justify-between items-end space-y-2 pt-5 md:pt-20 h-[40px]">
                  <ProfilePic className="relative w-20 h-20 sm:w-40 sm:h-40  border-4 border-gray-100 dark:border-gray-500 rounded-full overflow-hidden m-0 p-0 cursor-pointer" />
                  <FollowButtonHome
                    locale={locale}
                    className="min-w-[120px] absolute top-2 right-2  text-white rounded-full flex items-center justify-center hover:border-3 hover:border-black"
                  />
                </div>
                <div className="flex flex-col items-start mb-2 mt-4">
                  <div className="flex flex-row gap-2 items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Benja Henley
                    </h1>
                    <MdVerified className="text-gray-900 dark:text-white text-xl" />
                  </div>
                  <p className="font-normal text-lg text-gray-500 dark:text-gray-500 cursor-pointer">
                    <a
                      href="https://www.instagram.com/benjahenley/"
                      target="_blank">
                      @benjahenley
                    </a>
                  </p>
                </div>
                <h4 className="text-xl mb-1 mt-3 font-semibold text-gray-800 dark:text-white">
                  {home.bio.title}
                </h4>
                <TextBase className="mb-4">{home.bio.subtitle}</TextBase>

                <div className="flex flex-wrap gap-4 pb-2 ">
                  <div
                    className="cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={openCvModal}>
                    <div className="flex items-center gap-1">
                      <FaLink className="text-sm mb-[1.5px] text-gray-700 dark:text-gray-300" />
                      <p className="text-sm">Curriculum</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCakeCandles className="text-sm text-gray-700  mb-[2px] dark:text-gray-300" />
                    <p className="text-sm">27/06/2000</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-sm text-gray-700  mb-[2px] dark:text-gray-300" />
                    <p className="text-sm">
                      {locale === "es" ? "Inicio" : "Joined"} 05/2021
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center mb-4 mt-2">
                  <div className="flex flex-row gap-1 items-center">
                    <PriceText>322</PriceText>
                    <TextBase>Followers</TextBase>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <PriceText>395</PriceText>
                    <TextBase>Following</TextBase>
                  </div>
                </div>
              </div>
            </div>
            <OptionsMenu
              locale={locale}
              section={section}
              setSection={(newSection: string) =>
                setSection(newSection)
              }></OptionsMenu>
          </header>
          <section className="bg-white dark:bg-[#1f2937] dark:text-white w-full mx-auto z-0 ">
            <Suspense fallback={<SpinnerContainer />}>
              <div className="grid gap-4">
                {section === "feed" && <Feed locale={locale} />}
                {section === "about" && <About locale={locale} />}
                {section === "projects" && <Projects locale={locale} />}
                {section === "skills" && <Skillset locale={locale} />}
              </div>
            </Suspense>
          </section>
          <Footer />
          <NavbarMobile
            locale={locale}
            className="block md:hidden"
            onToggleMobileMenu={toggleMobileMenu}
          />
        </main>

        <aside className="relative hidden p-2 md:block md:w-[30vw] lg:w-[25vw] xl:w-[20vw] bg-white dark:bg-[#1f2937]">
          <RightBar locale={locale}></RightBar>
        </aside>
      </div>

      {/* CV Modal */}
      {cvModalOpen && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
          <div
            ref={cvModalRef}
            className="relative w-fit overflow-hidden transform transition-all duration-300 animate-modal-in flex flex-col">
            <button
              onClick={closeCvModal}
              className="hidden md:block absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white transition-all">
              <IoMdClose size={24} />
            </button>
            <button
              onClick={closeCvModal}
              className="md:hidden absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white transition-all">
              <IoMdClose size={10} />
            </button>

            <div className="flex-1 flex items-center justify-center">
              <img
                src={cvImageUrl}
                alt="Benja Henley CV"
                className="max-h-[80vh] max-w-full object-contain rounded"
                style={{ aspectRatio: "1 / 1.4" }}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black to-transparent">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Benjamin Henley</h3>
                  <p className="text-sm opacity-80">Curriculum Vitae</p>
                </div>
                <Link
                  href={cvImageUrl}
                  download={true}
                  target="_blank"
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-1.5 px-3 rounded-full transition-colors duration-200"
                  onClick={() => console.log("CV download initiated")}>
                  <FaDownload size={16} />
                  <span className="font-medium">Download</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-modal-in {
          animation: modalIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
