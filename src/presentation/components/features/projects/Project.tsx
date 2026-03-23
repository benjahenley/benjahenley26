import { MdPushPin } from "react-icons/md";
import { Count } from "@/infraestructure/interfaces/project";
import iconMapping from "@/utils/iconMapping";
import ProjectLinkInteractions from "./ProjectLinkInteractions";
import { TextBase } from "../../shared/ui/Texts";
import { Locales } from "@/infraestructure/interfaces";
import { IoMdArrowBack } from "react-icons/io";
import UserStatsExpandable from "../profile/UserStatsExpandable";
import CollapsableCalendar from "./CollapsableCalendar";
import LikeButton from "../../shared/ui/interactions/likes/LikeButton";
import CommentButton from "../../shared/ui/interactions/comments/CommentButton";
import RepostButton from "../../shared/ui/interactions/reposts/RepostButton";
import { useTheme } from "../../providers/Theme";

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
  onCommentClick,
  handleGoBack,
}: Props) {
  const { theme } = useTheme();
  const imageUrl =
    theme === "dark" ? projectData.images.dark : projectData.images.light;

  return (
    <div className={className}>
      <article className="transition-all duration-200 border-b px-4 py-3 border-slate-300 dark:border-gray-600">
        {projectData.pinned && (
          <div className="flex items-center gap-2 mb-2">
            <MdPushPin className="text-xs text-violet-400 dark:text-emerald-500" />
            <p className="text-xs text-violet-500 dark:text-emerald-400 font-medium">
              {locale === "es" ? "Proyecto Destacado" : "Featured Project"}
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
        <TextBase className="mb-4 ">{projectData.description[locale]}</TextBase>
        <div className="grid gap-4">
          {projectData.images && projectData.images.dark !== projectData.images.light ? (
            <div className="grid grid-cols-2 gap-2">
              {[projectData.images.dark, projectData.images.light].map((src, i) => (
                <div key={i} className="relative group overflow-hidden rounded-lg">
                  <img
                    src={src}
                    alt={projectData.title}
                    className="w-full h-auto transition-transform duration-200 group-hover:scale-105"
                  />
                  <ProjectLinkInteractions
                    url={projectData.url}
                    github={projectData.github}
                    imageSrc={src}
                  />
                </div>
              ))}
            </div>
          ) : projectData.images && (
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={projectData.title}
                className="w-full h-auto transition-transform duration-200 group-hover:scale-105"
              />
              <ProjectLinkInteractions
                url={projectData.url}
                github={projectData.github}
                imageSrc={imageUrl}
              />
            </div>
          )}
        </div>
        <div className="w-full flex justify-center md:justify-end">
          {projectData.techStack.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-3 my-4 max-w-full">
              {projectData.techStack.map((tech: string, key: number) => {
                const Icon = iconMapping[tech];
                if (!Icon) {
                  console.warn(`No icon found for tech: ${tech}`);
                  return null;
                }
                return (
                  <div key={key} className="flex items-center hover:scale-110">
                    <Icon className="text-md md:text-lg text-gray-800 dark:text-white" />
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
            selected={selected}
            commentCount={_count.comments}
            onCommentClick={onCommentClick}
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
