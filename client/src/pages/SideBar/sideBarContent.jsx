import { useState, useEffect } from "react";
import createAxiosInstance from "../../utils/axios";
import { useCookies } from "react-cookie";
import { Popover, Transition } from "@headlessui/react";
import ProjectItems from "./projectItems";
import AddProjectPopover from "./addProjectPopover";
import Notes from "./notes";
import {
  deleteProject,
  createProject,
  getSingleProject,
  updateProject,
} from "../../api/apiUtilsProject";

const SideBarContent = ({
  setProjectTitle,
  handleTaskCreated,
  setToastMessage,
  setShowToast,
  setTaskType,
  taskType,
  isMobileView,
}) => {
  const url = "http://localhost:3500/api/v1";
  const [cookies] = useCookies(["user"]);
  const token = cookies.Token;
  const Axios = createAxiosInstance(token);
  const [projectData, setProjectData] = useState([]);
  const [hoveredProjectId, setHoveredProjectId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [title, setTitle] = useState("");
  const [isProjectFocusId, setIsProjectFocusId] = useState("");
  const [rerender, setRerender] = useState(false);

  const handleDeleteProject = (id) => {
    deleteProject(url, id, Axios)
      .then(() => {
        setProjectTitle("");
        setTaskType("notes");
        setIsDeleted(!isDeleted);
        handleTaskCreated();
      })
      .catch((err) => {
        setToastMessage(err.message);
        setShowToast(true);
      });
  };

  const handleGetAllProject = async () => {
    try {
      const response = await Axios.get(`${url}/projects`);
      const { project } = response.data;
      setProjectData(project);
    } catch (err) {
      setToastMessage(err.message);
      setShowToast(true);
    }
  };
  const handleGetSingleProject = (id) => {
    getSingleProject(url, id, Axios).then((data) => {
      setTaskType("project");
      setProjectTitle(data.project._id);
      setIsProjectFocusId(data.project._id);
      handleTaskCreated();
    });
  };
  const handleGetNoteTasks = () => {
    setTaskType("notes");
    setProjectTitle(null);
    setIsProjectFocusId(null);
    handleTaskCreated();
  };
  const handleCreateProject = () => {
    createProject(url, title, Axios)
      .then(() => {
        setRerender(!rerender);
        setTitle("");
      })
      .catch((err) => {
        setToastMessage(err.message);
        setShowToast(true);
      });
  };
  const handleUpdateProject = (id) => {
    updateProject(url, title, id, Axios)
      .then(() => {
        setRerender(!rerender);
        setTitle("");
      })
      .catch((err) => {
        setToastMessage(err.message);
        setShowToast(true);
      });
  };
  useEffect(() => {
    handleGetAllProject();
  }, [isDeleted, rerender]);
  return (
    <div
      className={`${
        isMobileView
          ? "md:hidden block"
          : "hidden md:block md:fixed md:inset-y-0"
      } bg-white w-72 text-blue-950 md:border-blue-950 md:border-r-[1px] md:shadow-md`}
    >
      <div className=" flex flex-col items-center">
        <h1 className="text-4xl font-black my-6 w-full pl-9 tracking-tight drop-shadow-sm shadow-blue-sm">
          TaskNote
        </h1>
        <div className=" flex flex-col items-start flex-1 w-full">
          <Notes handleGetNoteTasks={handleGetNoteTasks} taskType={taskType} />
          <h2 className=" text-3xl font-bold  mb-6 pl-10 tracking-tight">
            Projects
          </h2>
          <div
            className={`w-full md:max-h-[350px] max-h-[60vh] md:overflow-hidden md:hover:overflow-y-auto overflow-y-auto`}
          >
            {projectData.map((project) => (
              <ProjectItems
                hoveredProjectId={hoveredProjectId}
                setHoveredProjectId={setHoveredProjectId}
                handleDeleteProject={handleDeleteProject}
                handleGetSingleProject={handleGetSingleProject}
                project={project}
                isProjectFocusId={isProjectFocusId}
                setIsProjectFocusId={setIsProjectFocusId}
                Popover={Popover}
                Transition={Transition}
                projectTitleName={title}
                setProjectTitleName={setTitle}
                handleUpdateProject={handleUpdateProject}
                key={project._id}
              />
            ))}
          </div>
          <div className="w-[95%] mx-auto">
            <AddProjectPopover
              title={title}
              setTitle={setTitle}
              handleCreateProject={handleCreateProject}
              Popover={Popover}
              Transition={Transition}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
