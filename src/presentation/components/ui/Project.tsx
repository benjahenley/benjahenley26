import { MdPushPin } from "react-icons/md";
import { Count } from "@/infraestructure/interfaces/project";
import iconMapping from "@/utils/iconMapping";
import ProjectLinkInteractions from "./ProjectLinkInteractions";
import UserStatsExpandable from "./UserStatsExpandable";
import { TextBase } from "./Texts";
import LikeButton from "./interactions/likes/LikeButton";
import CommentButton from "./interactions/comments/CommentButton";
import RepostButton from "./interactions/reposts/RepostButton";
import { Locales } from "@/infraestructure/interfaces";
import { IoMdArrowBack } from "react-icons/io";
import CollapsableCalendar from "./CollapsableCalendar";

export type Props = {
  selected?: boolean;
  expandedView?: boolean;
  projectData: any;
  className?: string;
  locale: Locales;
  _count: Count;
  onCommentClick: () => void;
  handleGoBack?: () => void;
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
}: Props) {
  return (
    <div className={className}>
      <article className=" transition-all duration-200 border-b border-slate-300 dark:border-gray-600 px-4 py-3  hover:bg-gray-100 dark:hover:bg-slate-700">
        {selected && (
          <div className="w-full pb-6 pt-2 px-2">
            <button
              onClick={handleGoBack}
              className="back-button flex flex-row gap-2 items-center rounded-full hover:bg-white dark:hover:bg-gray-800 p-3">
              <IoMdArrowBack className="text-xl text-gray-800 dark:text-white" />
              {/* <p className="text-lg">back to projects</p> */}
            </button>
          </div>
        )}

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
        <ul className="mt-3 flex justify-around w-full max-w-lg mx-auto">
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
