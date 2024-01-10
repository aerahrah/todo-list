import { useEffect } from "react";
import { getAllProject } from "../../api/projectAPI";
import {
  toggleRefetchProjectData,
  setIsFocusProject,
} from "../../store/slices/projectSlice/fetchProjectSlice";
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
  const { theme } = useSelector((state) => state.theme);
  const { refetchData, allProjectData } = useSelector((state) => state.project);
  const { taskType } = useSelector((state) => state.filter);

  const handleGetAllProject = async () => {
    try {
      dispatch(getAllProject());
    } catch (err) {
      dispatch(setToastMessage(err.message));
      dispatch(toggleDisplayToast());
    }
  };

  const handleGetSingleProject = (project) => {
    dispatch(setTaskType("project"));
    dispatch(setProjectId(project._id));
    dispatch(setIsFocusProject(project._id));
    dispatch(toggleRefetchTaskData());
    dispatch(toggleRefetchProjectData());
  };

  const handleGetNoteTasks = () => {
    dispatch(setTaskType("notes"));
    dispatch(setProjectId(""));
    dispatch(setIsFocusProject(null));
    dispatch(toggleRefetchTaskData());
    dispatch(toggleRefetchProjectData());
  };

  useEffect(() => {
    handleGetAllProject();
  }, [refetchData]);

  return (
    <div
      className={`${
        isMobileView
          ? `md:hidden block relative ${
              theme === "light"
                ? "bg-white text-neutral-800"
                : "bg-neutral-800 text-neutral-300"
            }`
          : `hidden md:block fixed z-30 md:inset-y-0 ${
              theme === "light"
                ? "bg-white text-neutral-800 border-neutral-300"
                : "bg-neutral-800 text-neutral-300 border-neutral-700/70"
            }`
      }  inset-0 w-72 md:border-r-[2px]  md:shadow-md`}
    >
      <div className=" flex flex-col items-center">
        <h1 className="text-4xl font-black my-6 w-full pl-9 tracking-tight drop-shadow-sm shadow-blue-sm">
          TaskNote
        </h1>
        <div className=" flex flex-col items-start flex-1 w-full">
          <Notes
            handleGetNoteTasks={handleGetNoteTasks}
            taskType={taskType}
            theme={theme}
          />
          <h2 className=" text-3xl font-bold  mb-6 pl-10 tracking-tight">
            Projects
          </h2>
          {allProjectData && (
            <div
              className={`w-full md:max-h-[350px] max-h-[60vh] md:overflow-hidden md:hover:overflow-y-auto overflow-y-auto`}
            >
              {allProjectData.map((project) => (
                <ProjectItems
                  project={project}
                  handleGetSingleProject={handleGetSingleProject}
                  theme={theme}
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
