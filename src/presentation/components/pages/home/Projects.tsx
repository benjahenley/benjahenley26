import { Locales } from "@/infraestructure/interfaces/index";
import { contents } from "@/data/contents/content";
import Project from "../../ui/Project";
import { useCallback, useEffect, useState } from "react";
import { getProjects } from "@/utils/getProjects";
import {
  ApiProjectItemResponse,
  Count,
  LocalProjectItem,
} from "@/infraestructure/interfaces/project";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "../../modals/context";
import ProjectComments from "../../ui/interactions/comments/ProjectComments";
import { SpinnerContainer } from "../../ui/SpinnerContainer";

type Props = {
  locale: Locales;
  className?: string;
};

export default function Projects({ locale, className }: Props) {
  const [selectedApiProject, setSelectedApiProject] =
    useState<ApiProjectItemResponse | null>(null);

  const [selectedLocalProject, setSelectedLocalProject] =
    useState<LocalProjectItem | null>(null);

  const [projectsApiData, setProjectApiData] = useState<
    ApiProjectItemResponse[]
  >([]);

  const [projectsLocalData, setProjectsLocalData] = useState<
    LocalProjectItem[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);

  const modal = useModal();

  // Fetch API projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjectApiData(response);
      } catch (error) {
        console.error("Error fetching project interactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!selectedApiProject) {
      fetchProjects();
    }
  }, [selectedApiProject]);

  // Load local projects
  useEffect(() => {
    const { projectArray } = contents[locale].pages.home.projects;
    const sortedProjects = [...projectArray].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    setProjectsLocalData(sortedProjects);
  }, [locale]);

  // Filter API project based on local project ID
  function filterProjectFromApi(project: any) {
    const projectId: number = JSON.parse(project.projectId);
    const filteredProject = projectsApiData.find(
      (item: ApiProjectItemResponse) => item.id === projectId
    );
    return filteredProject;
  }

  // Handle comment click to select project
  const handleCommentClick = useCallback(
    (filteredProject: ApiProjectItemResponse, project: LocalProjectItem) => {
      setSelectedApiProject(filteredProject);
      setSelectedLocalProject(project);
    },
    []
  );

  // Loading Spinner
  if (loading) {
    return <SpinnerContainer />;
  }

  // Error Handling
  if (!projectsApiData) {
    return (
      <div className="w-full h-auto flex justify-center items-center">
        <img
          src="/photos/error/404.jpg"
          className="w-full h-auto"
          alt="Error"
        />
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden`}>
      <AnimatePresence mode="wait">
        {selectedApiProject ? (
          <motion.div
            key="comment-view"
            initial={{ opacity: 1, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 2000 }}
            transition={{ duration: 0.2, ease: "linear" }}>
            <Project
              selected
              locale={locale}
              projectData={selectedLocalProject}
              _count={selectedApiProject._count}
              handleGoBack={() => setSelectedApiProject(null)}
              onCommentClick={() => modal.openModal("ADD_COMMENT")}
            />

            <div>
              <ProjectComments
                projectId={selectedApiProject.id}
                comments={selectedApiProject.comments}></ProjectComments>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="project-list"
            initial={{ opacity: 1, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -1000 }}
            transition={{ duration: 0.2, ease: "linear" }}>
            {projectsLocalData.map((project: any, index: number) => {
              const filteredProject = filterProjectFromApi(project);

              const empty: Count = {
                likes: 0,
                comments: 0,
                reposts: 0,
              };

              const handleClick = () => {
                if (filteredProject) {
                  handleCommentClick(filteredProject, project);
                }
              };

              return (
                <Project
                  locale={locale}
                  key={index}
                  projectData={project}
                  _count={filteredProject ? filteredProject._count : empty}
                  onCommentClick={handleClick}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
