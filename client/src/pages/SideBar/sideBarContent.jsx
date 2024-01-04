import { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  deleteProject,
  getSingleProject,
  updateProject,
  getAllProject,
} from "../../api/projectAPI";
import { toggleRefetchProjectData } from "../../store/slices/projectSlice/fetchProjectSlice";
import { toggleRefetchTaskData } from "../../store/slices/taskSlice/fetchTaskSlice";
import { setTaskType, setProjectId } from "../../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../store/slices/toastSlice";
import ProjectItems from "./projectItems";
import CreateProject from "./createProject";
import Notes from "./notes";

const SideBarContent = ({ isMobileView }) => {
  const dispatch = useDispatch();
  const { refetchData, allProjectData } = useSelector((state) => state.project);
  const { taskType } = useSelector((state) => state.filter);
  const [hoveredProjectId, setHoveredProjectId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [title, setTitle] = useState("");
  const [isProjectFocusId, setIsProjectFocusId] = useState("");

  const handleGetAllProject = async () => {
    try {
      dispatch(getAllProject());
    } catch (err) {
      dispatch(setToastMessage(err.message));
      dispatch(toggleDisplayToast());
    }
  };

  const handleDeleteProject = (id) => {
    deleteProject(id)
      .then(() => {
        dispatch(setProjectId(""));
        dispatch(setTaskType("notes"));
        dispatch(toggleRefetchTaskData());
        dispatch(toggleRefetchProjectData());
        setIsDeleted(!isDeleted);
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

  const handleGetSingleProject = (id) => {
    getSingleProject(id).then((data) => {
      dispatch(setTaskType("project"));
      dispatch(setProjectId(data.project._id));
      dispatch(toggleRefetchTaskData());
      dispatch(toggleRefetchProjectData());
      setIsProjectFocusId(data.project._id);
    });
  };
  const handleGetNoteTasks = () => {
    dispatch(setTaskType("notes"));
    dispatch(setProjectId(""));
    dispatch(toggleRefetchTaskData());
    dispatch(toggleRefetchProjectData());
    setIsProjectFocusId(null);
  };

  const handleUpdateProject = (id) => {
    updateProject(title, id)
      .then(() => {
        setTitle("");
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };
  useEffect(() => {
    handleGetAllProject();
  }, [isDeleted, refetchData]);

  return (
    <div
      className={`${
        isMobileView
          ? "md:hidden block relative"
          : "hidden md:block fixed z-30 md:inset-y-0"
      } bg-white dark:bg-neutral-800 w-72 text-neutral-800 dark:text-neutral-300 md:border-neutral-300 md:dark:border-neutral-700/70 md:border-r-[2px]  md:shadow-md`}
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
          {allProjectData && (
            <div
              className={`w-full md:max-h-[350px] max-h-[60vh] md:overflow-hidden md:hover:overflow-y-auto overflow-y-auto`}
            >
              {console.log(allProjectData)}

              {allProjectData.map((project) => (
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
          )}
          <div className="w-[95%] mx-auto">
            <CreateProject />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
