import { FaEdit, FaTrash, FaTasks } from "react-icons/fa";
import UpdateProjectPopover from "./updateProjectPopover";
const ProjectItems = ({
  hoveredProjectId,
  setHoveredProjectId,
  handleDeleteProject,
  handleGetSingleProject,
  isProjectFocusId,
  Popover,
  Transition,
  projectTitleName,
  setProjectTitleName,
  handleUpdateProject,
  project,
}) => {
  return (
    <Popover className="">
      <div
        className={`relative w-[95%] mb-2 mx-auto rounded-md hover:bg-blue-200/50 hover:font-semibold`}
        onMouseEnter={() => setHoveredProjectId(project._id)}
        onMouseLeave={() => setHoveredProjectId(null)}
      >
        <h3
          className={`text-lg flex items-center  gap-4 hover:cursor-pointer pl-10 py-1 rounded-md mx-auto ${
            isProjectFocusId === project._id
              ? "bg-blue-200/50 font-semibold"
              : ""
          }`}
          onClick={() => handleGetSingleProject(project._id)}
        >
          <FaTasks />
          {project.projectTitle}
        </h3>
        {hoveredProjectId === project._id && (
          <div className="flex absolute top-[50%] -translate-y-[50%] right-0">
            <Popover.Button className="hover:cursor-pointer hover:text-blue-500 mr-2">
              <FaEdit
                onClick={() => setProjectTitleName(project.projectTitle)}
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
          Popover={Popover}
          Transition={Transition}
          projectTitleName={projectTitleName}
          setProjectTitleName={setProjectTitleName}
          handleUpdateProject={handleUpdateProject}
          projectId={project._id}
        />
      </div>
    </Popover>
  );
};
export default ProjectItems;
