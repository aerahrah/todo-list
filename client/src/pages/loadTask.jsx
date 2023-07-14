import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import createAxiosInstance from "../components/utils/axios";
import Toast from "../components/toast";
import TaskModal from "../components/taskModal";
import CreateTask from "./createTask";
import SearchBar from "../components/serachBar";
import TaskCard from "../components/taskCardContainer";
import { getSingleTask } from "../components/utils/apiUtils";
import Spinner from "../components/spinner";

const GetAllTask = () => {
  const url = "http://localhost:3500/api/v1";
  const [tasksData, setTasksData] = useState([]);
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
  const token = cookies.Token;
  const Axios = createAxiosInstance(token);

  useEffect(() => {
    handleGetAllTask();
  }, [isModalOpen, finish, updateTrigger]);

  const handleGetAllTask = async () => {
    try {
      const response = await Axios.get(
        `${url}/tasks?searchTerm=${filteredTask}`
      );
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
        <div className="py-4 px-6 text-gray-800">
          <SearchBar
            handleGetAllTask={handleGetAllTask}
            setFilteredTask={setFilteredTask}
          />
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
                {tasksData.some((task) => task.completed)
                  ? "Not completed tasks"
                  : "All Tasks"}
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
          <CreateTask
            url={url}
            modalTaskData={modalTaskData}
            setModalTaskData={setModalTaskData}
            setFinish={setFinish}
            finish={finish}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
            onTaskCreated={handleTaskCreated}
            Axios={Axios}
          />
        </div>
      )}
      <TaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
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
