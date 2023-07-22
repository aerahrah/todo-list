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
      console.log(project);
      setProjectData(project);
    } catch (e) {
      console.log(e);
    }
  };
  const handleGetSingleProject = (id) => {
    getSingleProject(url, id, Axios).then((data) => {
      console.log(data);
      setProjectTitle(data);
      handleTaskCreated();
    });
  };
  const handleCreateProject = () => {
    createProject(url, title, Axios)
      .then((data) => {
        console.log(data);
        setRerender(!rerender);
        setAddProjectOpen(false);
      })
      .catch((e) => {
        console.log(e);
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
      } bg-blue-400 w-64 text-gray-800 `}
    >
      <div className="my-4 flex flex-col items-center">
        <h1 className="text-4xl font-black">TaskNote</h1>
        <div className="mt-12 flex flex-col items-start flex-1 w-full">
          <h2 className=" text-3xl font-bold  mb-6 pl-12 ">Projects</h2>
          {projectData.map((project) => (
            <ProjectItems
              hoveredProjectId={hoveredProjectId}
              setHoveredProjectId={setHoveredProjectId}
              handleDeleteProject={handleDeleteProject}
              handleGetSingleProject={handleGetSingleProject}
              project={project}
              key={project._id}
            />
          ))}
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
