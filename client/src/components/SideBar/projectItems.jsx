import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectItems = ({
  hoveredProjectId,
  setHoveredProjectId,
  handleDeleteProject,
  handleGetSingleProject,
  project,
}) => {
  return (
    <div
      className="relative w-[95%] hover:bg-white mb-2 pl-12 py-1 rounded-md mx-auto"
      onMouseEnter={() => setHoveredProjectId(project._id)}
      onMouseLeave={() => setHoveredProjectId(null)}
    >
      <h3
        className="text-lg font-semibold hover:cursor-pointer"
        onClick={() => handleGetSingleProject(project._id)}
      >
        {project.projectTitle}
      </h3>
      {hoveredProjectId === project._id && (
        <div className="flex absolute top-[50%] -translate-y-[50%] right-0">
          <button className="hover:cursor-pointer mr-2">
            <FaEdit />
          </button>

          <button
            className="hover:cursor-pointer mr-2"
            onClick={() => handleDeleteProject(project._id)}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};
export default ProjectItems;
