import { MdPushPin } from "react-icons/md";
import { Count } from "@/infraestructure/interfaces/project";
import iconMapping from "@/utils/iconMapping";
import ProjectLinkInteractions from "./ProjectLinkInteractions";
import { TextBase } from "../../shared/ui/Texts";
import { Locales } from "@/infraestructure/interfaces";
import { IoMdArrowBack } from "react-icons/io";
import UserStatsExpandable from "../profile/UserStatsExpandable";
import CollapsableCalendar from "../../shared/ui/CollapsableCalendar";
import LikeButton from "../../shared/ui/interactions/likes/LikeButton";
import CommentButton from "../../shared/ui/interactions/comments/CommentButton";
import RepostButton from "../../shared/ui/interactions/reposts/RepostButton";

export type Props = {
  selected?: boolean;
  expandedView?: boolean;
  projectData: any;
  className?: string;
  locale: Locales;
  _count: Count;
  onCommentClick: () => void;
  handleGoBack?: () => void;
  handlePreviousProject?: () => void;
  handleNextProject?: () => void;
};

function Project({
  className,
  projectData,
  _count,
  locale,
  selected,
  expandedView,
  onCommentClick,
  handleGoBack,
  handlePreviousProject,
  handleNextProject,
}: Props) {
  return (
    <div className={className}>
      <article className=" transition-all duration-200 border-b border-slate-300 dark:border-gray-600 px-4 py-3  hover:bg-gray-100 dark:hover:bg-slate-700">
        {projectData.pinned && (
          <div className="flex items-center gap-2 mb-2">
            <MdPushPin className="text-xs text-gray-500" />
            <p className="text-xs">
              {locale === "es" ? "Proyecto Pinneado" : "Pinned Project"}
            </p>
          </div>
        )}
        <div className="w-full flex flex-row justify-between items-center mb-4 md:pr-4">
          <UserStatsExpandable
            userName="Benja Henley"
            userTag={"@benjahenley"}
          />
          <div className="hidden calendar__desktop">
            <CollapsableCalendar date={projectData.date} />
          </div>
        </div>
        <TextBase className="mb-4 ">{projectData.description}</TextBase>
        <div className="grid gap-4 group">
          {projectData.images &&
            projectData.images.map((image: string, key: number) => (
              <div
                key={key}
                className="relative group overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={image}
                  className="w-full h-auto transition-transform duration-200 group-hover:scale-105"
                />
                <ProjectLinkInteractions
                  url={projectData.url}
                  github={projectData.github}
                  imageSrc={image}
                />
              </div>
            ))}
        </div>
        <div className="w-full flex justify-center md:justify-end">
          {projectData.techStack.length > 0 && (
            <div className="flex flex-wrap items-start gap-3 my-4">
              {/* <p className="hidden md:flex font-bold text-gray-800 dark:text-white">
                {projectData.techStack.title}:
              </p> */}
              {projectData.techStack.map((tech: string, key: number) => {
                const Icon = iconMapping[tech];
                if (!Icon) {
                  console.warn(`No icon found for tech: ${tech}`);
                  return null;
                }
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 hover:scale-110">
                    <Icon className="text-lg text-gray-800 dark:text-white" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <ul
          className={`${
            selected && "hidden"
          } mt-3 flex justify-around w-full max-w-lg mx-auto`}>
          <LikeButton
            projectId={projectData.projectId}
            likeCount={_count.likes}
          />
          <CommentButton
            selected={selected && selected}
            commentCount={_count.comments}
            onCommentClick={() => onCommentClick()}
          />
          <RepostButton
            projectId={projectData.projectId}
            initialCount={_count.reposts}
          />
        </ul>
        {/* TODO: other buttons */}
        <ul className="mt-3 flex justify-around w-full max-w-lg mx-auto"></ul>
      </article>
    </div>
  );
}

export default Project;
