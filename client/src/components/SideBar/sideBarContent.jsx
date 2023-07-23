import { useState, useEffect } from "react";
import createAxiosInstance from "../utils/axios";
import { useCookies } from "react-cookie";
import { Popover, Transition } from "@headlessui/react";
import ProjectItems from "./projectItems";
import AddProjectPopover from "./addProjectPopover";
import {
  deleteProject,
  createProject,
  getSingleProject,
} from "../utils/apiUtilsProject";

const SideBarContent = ({
  setProjectTitle,
  handleTaskCreated,
  setToastMessage,
  setShowToast,
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
      .then((data) => {
        console.log(data);
        setIsDeleted(!isDeleted);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGetAllProject = async () => {
    try {
      const response = await Axios.get(`${url}/projects`);
      const { project } = response.data;
      setProjectData(project);
    } catch (e) {
      console.log(e);
    }
  };
  const handleGetSingleProject = (id) => {
    getSingleProject(url, id, Axios).then((data) => {
      setProjectTitle(data);
      setIsProjectFocusId(data);
      handleTaskCreated();
    });
  };
  const handleCreateProject = () => {
    createProject(url, title, Axios)
      .then((data) => {
        console.log(data);
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
        <h1 className="text-4xl font-black mt-6 w-full pl-9 tracking-tight drop-shadow-sm shadow-blue-sm">
          TaskNote
        </h1>
        <div className="mt-12 flex flex-col items-start flex-1 w-full">
          <h2 className=" text-3xl font-bold  mb-6 pl-10 tracking-tight">
            Projects
          </h2>
          <div className="w-full md:max-h-[350px] max-h-[60vh] overflow-y-auto">
            {projectData.map((project) => (
              <ProjectItems
                hoveredProjectId={hoveredProjectId}
                setHoveredProjectId={setHoveredProjectId}
                handleDeleteProject={handleDeleteProject}
                handleGetSingleProject={handleGetSingleProject}
                project={project}
                isProjectFocusId={isProjectFocusId}
                key={project._id}
              />
            ))}
          </div>
          <div className="w-[95%]  mx-auto">
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
