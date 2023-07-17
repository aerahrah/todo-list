import { useState, useEffect } from "react";
import createAxiosInstance from "./utils/axios";
import { useCookies } from "react-cookie";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProject } from "./utils/apiUtilsProject";

const SideBar = () => {
  const url = "http://localhost:3500/api/v1";
  const [cookies] = useCookies(["user"]);
  const token = cookies.Token;
  const Axios = createAxiosInstance(token);
  const [projectData, setProjectData] = useState([]);
  const [hoverProject, setHoverProject] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
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

  useEffect(() => {
    handleGetAllProject();
  }, [isDeleted]);
  return (
    <div className="bg-sky-500 w-64 md:fixed md:inset-y-0 text-gray-800">
      <div className="my-4 flex flex-col items-center">
        <h1 className="text-4xl font-black">TaskNote</h1>
        <div className=" mt-12 flex flex-col items-start flex-1 w-full">
          <h2 className="pl-16 text-3xl font-bold  mb-6">Projects</h2>
          {projectData.map((project) => (
            <div
              className="relative flex-1 w-full hover:bg-white"
              key={project._id}
              onMouseEnter={() => setHoverProject(true)}
              onMouseLeave={() => setHoverProject(false)}
            >
              <h3 className="text-lg font-semibold hover:cursor-pointer  pl-16 ">
                {project.projectTitle}
              </h3>
              {hoverProject && (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
