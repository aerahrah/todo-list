import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import createAxiosInstance from "../components/utils/axios";
import Toast from "../components/toast";
import TaskModal from "../components/taskModal";
import CreateTask from "./createTask";
import TaskSearchBar from "../components/NavBar/TaskSearchBar";
import TaskCard from "../components/taskCardContainer";
import { getSingleTask } from "../components/utils/apiUtilsTask";
import Spinner from "../components/spinner";
import SideBar from "../components/SideBar/sidebar";

const GetAllTask = () => {
  const url = "http://localhost:3500/api/v1";
  const [tasksData, setTasksData] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalTaskData, setModalTaskData] = useState({});
  const [finish, setFinish] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [cookies] = useCookies(["user"]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [filteredTask, setFilteredTask] = useState("");
  const [sortByTask, setSortByTask] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const token = cookies.Token;
  const Axios = createAxiosInstance(token);

  useEffect(() => {
    handleGetAllTask();
  }, [isModalOpen, finish, updateTrigger]);

  const handleGetAllTask = async () => {
    try {
      const response = await Axios.get(`${url}/tasks`, {
        params: {
          searchTerm: filteredTask,
          sortBy: sortByTask,
          projectId: projectTitle,
        },
      });
      const { tasks } = response.data;
      setTasksData(tasks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskCreated = () => {
    setUpdateTrigger((prevTrigger) => !prevTrigger);
  };

  const handleSingleTask = (id) => {
    getSingleTask(url, id, Axios)
      .then((data) => {
        const { task } = data;
        setTaskName(task.name);
        setTaskTitle(task.title);
        setModalTaskData(task);
        setFinish(task.completed);
      })
      .catch((err) => console.error(err));
  };

  const handleViewSpecificTask = (id) => {
    handleSingleTask(id);
    setIsModalOpen(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <SideBar
            setProjectTitle={setProjectTitle}
            handleTaskCreated={handleTaskCreated}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
          <div className="text-gray-800 md:pl-64  flex-1 ">
            <TaskSearchBar
              handleTaskCreated={handleTaskCreated}
              setFilteredTask={setFilteredTask}
              setSortByTask={setSortByTask}
              setIsSideBarOpen={setIsSideBarOpen}
            />
            <div className="py-4 px-6">
              {tasksData.some((task) => task.completed) && (
                <div>
                  <h2 className="mb-4 px-1 uppercase font-semibold text-sm text-gray-500">
                    Completed tasks
                  </h2>
                  <div className="columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4  h-auto mb-8">
                    {tasksData
                      .filter((task) => task.completed)
                      .map((task) => (
                        <TaskCard
                          key={task._id}
                          taskId={task._id}
                          taskName={task.name}
                          taskTitle={task.title}
                          taskCompleted={task.completed}
                          handleViewSpecificTask={handleViewSpecificTask}
                        />
                      ))}
                  </div>
                </div>
              )}
              {tasksData.some((task) => !task.completed) && (
                <div>
                  <h2 className="mb-4 px-1 uppercase font-semibold text-sm text-gray-500">
                    Not completed tasks
                  </h2>
                  <div className="columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4  h-auto">
                    {tasksData
                      .filter((task) => !task.completed)
                      .map((task) => (
                        <TaskCard
                          key={task._id}
                          taskId={task._id}
                          taskName={task.name}
                          taskTitle={task.title}
                          taskCompleted={task.completed}
                          handleViewSpecificTask={handleViewSpecificTask}
                        />
                      ))}
                  </div>
                </div>
              )}
              {projectTitle && (
                <CreateTask
                  url={url}
                  projectTitle={projectTitle}
                  setProjectTitle={setProjectTitle}
                  modalTaskData={modalTaskData}
                  setModalTaskData={setModalTaskData}
                  setFinish={setFinish}
                  finish={finish}
                  setToastMessage={setToastMessage}
                  setShowToast={setShowToast}
                  onTaskCreated={handleTaskCreated}
                  Axios={Axios}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <TaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleTaskCreated={handleTaskCreated}
        url={url}
        modalTaskData={modalTaskData}
        setTaskName={setTaskName}
        setTaskTitle={setTaskTitle}
        setModalTaskData={setModalTaskData}
        setFinish={setFinish}
        taskName={taskName}
        taskTitle={taskTitle}
        finish={finish}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
        Axios={Axios}
      />
      {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}
    </div>
  );
};

export default GetAllTask;
