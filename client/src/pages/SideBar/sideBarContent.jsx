import { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  deleteProject,
  createProject,
  getSingleProject,
  updateProject,
} from "../../api/projectAPI";
import { setTaskType, setProjectId } from "../../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../store/slices/toastSlice";
import ProjectItems from "./projectItems";
import AddProjectPopover from "./addProjectPopover";
import Notes from "./notes";

const SideBarContent = ({ handleTaskCreated, isMobileView }) => {
  const dispatch = useDispatch();
  const { taskType } = useSelector((state) => state.filter);
  const [projectData, setProjectData] = useState([]);
  const [hoveredProjectId, setHoveredProjectId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [title, setTitle] = useState("");
  const [isProjectFocusId, setIsProjectFocusId] = useState("");
  const [rerender, setRerender] = useState(false);

  const handleDeleteProject = (id) => {
    deleteProject(id)
      .then(() => {
        dispatch(setProjectId(""));
        dispatch(setTaskType("notes"));

        setIsDeleted(!isDeleted);
        handleTaskCreated();
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

  const handleGetAllProject = async () => {
    try {
      const response = await Axios.get(`${url}/projects`);
      const { project } = response.data;
      setProjectData(project);
    } catch (err) {
      dispatch(setToastMessage(err.message));
      dispatch(toggleDisplayToast());
    }
  };
  const handleGetSingleProject = (id) => {
    getSingleProject(id).then((data) => {
      dispatch(setTaskType("project"));
      dispatch(setProjectId(data.project._id));
      setIsProjectFocusId(data.project._id);
      handleTaskCreated();
    });
  };
  const handleGetNoteTasks = () => {
    dispatch(setTaskType("notes"));
    dispatch(setProjectId(""));
    setIsProjectFocusId(null);
    handleTaskCreated();
  };
  const handleCreateProject = () => {
    createProject(title)
      .then(() => {
        setRerender(!rerender);
        setTitle("");
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };
  const handleUpdateProject = (id) => {
    updateProject(title, id)
      .then(() => {
        setRerender(!rerender);
        setTitle("");
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };
  useEffect(() => {
    handleGetAllProject();
  }, [isDeleted, rerender]);

  return (
    <div
      className={`${
        isMobileView
          ? "md:hidden block relative"
          : "hidden md:block fixed z-30 md:inset-y-0"
      } bg-white w-72 text-blue-950 md:border-neutral-300 md:border-r-[2px] md:shadow-md`}
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
