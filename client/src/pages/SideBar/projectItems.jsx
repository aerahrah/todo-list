import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTaskType, setProjectId } from "../../store/slices/filterSlice";
import { toggleRefetchProjectData } from "../../store/slices/projectSlice/fetchProjectSlice";
import { toggleRefetchTaskData } from "../../store/slices/taskSlice/fetchTaskSlice";
import {
  setIsHoverProject,
  setIsFocusProject,
} from "../../store/slices/projectSlice/fetchProjectSlice";
import { FaEdit, FaTrash, FaTasks } from "react-icons/fa";
import { Popover } from "@headlessui/react";
import UpdateProjectPopover from "./updateProjectPopover";

const ProjectItems = ({ handleGetSingleProject, project }) => {
  const dispatch = useDispatch();

  const { isHoverProject, isFocusProject } = useSelector(
    (state) => state.project
  );

  const [title, setTitle] = useState("");

  const handleDeleteProject = (id) => {
    deleteProject(id)
      .then(() => {
        dispatch(setProjectId(""));
        dispatch(setTaskType("notes"));
        dispatch(toggleRefetchTaskData());
        dispatch(toggleRefetchProjectData());
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
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

  return (
    <Popover className="">
      <div
        className={`relative w-[95%] mb-1 mx-auto rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-900/50`}
        onMouseEnter={() => dispatch(setIsHoverProject(project._id))}
        onMouseLeave={() => dispatch(setIsHoverProject(null))}
        onClick={() => dispatch(setIsHoverProject(project._id))}
      >
        <h3
          className={`text-lg flex items-center  gap-4 hover:cursor-pointer pl-10 py-2 rounded-md mx-auto ${
            isFocusProject === project._id
              ? "bg-neutral-300 dark:bg-neutral-900/50 font-semibold"
              : ""
          }`}
          onClick={() => handleGetSingleProject(project)}
        >
          <i>
            <FaTasks />
          </i>
          {project.projectTitle}
        </h3>
        {isHoverProject === project._id && (
          <div className="flex absolute top-[50%] -translate-y-[50%] right-0">
            <Popover.Button className="hover:cursor-pointer hover:text-blue-500 mr-2">
              <FaEdit
                onClick={() => {
                  setTitle(project.projectTitle);
                  dispatch(setIsFocusProject(project._id));
                }}
              />
            </Popover.Button>

            <button
              className="hover:cursor-pointer hover:text-red-500 mr-2"
              onClick={() => handleDeleteProject(project._id)}
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <div className="w-[95%] mx-auto">
        <UpdateProjectPopover
          title={title}
          setTitle={setTitle}
          handleUpdateProject={handleUpdateProject}
          projectId={project._id}
        />
      </div>
    </Popover>
  );
};
export default ProjectItems;
