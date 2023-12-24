import React, { useState, useEffect } from "react";
import { getSingleTask } from "../api/taskAPI";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/axios";
import Toast from "../components/toast";
import TaskModal from "../pages/TaskComponents/taskModal";
import CreateTask from "../pages/TaskComponents/createTask/createTaskBtn";
import Spinner from "../components/spinner";
import SideBar from "../pages/SideBar/sidebar";
import SideBarMobile from "../pages/SideBar/sideBarMobile";
import NavBar from "../components/NavBar/navbar";
import TaskList from "../pages/taskComponents/taskList";

const TaskNote = () => {
  const url = "http://localhost:3500/api/v1";
  const { filterTask, sortTask, taskType, projectId } = useSelector(
    (state) => state.filter
  );
  const [tasksData, setTasksData] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalTaskData, setModalTaskData] = useState({});
  const [finish, setFinish] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    handleGetAllTask();
  }, [isModalOpen, finish, updateTrigger]);

  const handleGetAllTask = async () => {
    try {
      const response = await Axios.get(`${url}/tasks`, {
        params: {
          searchTerm: filterTask,
          sortBy: sortTask,
          projectId,
          taskType,
        },
      });
      const { tasks } = response.data;
      setTasksData(tasks);
      setIsLoading(false);
    } catch (err) {
      setToastMessage(err.message);
      setShowToast(true);
    }
  };

  const handleTaskCreated = () => {
    setUpdateTrigger((prevTrigger) => !prevTrigger);
  };

  const handleSingleTask = (id) => {
    getSingleTask(id)
      .then((data) => {
        const { task } = data;
        setTaskName(task.name);
        setTaskTitle(task.title);
        setModalTaskData(task);
        setFinish(task.completed);
      })
      .catch((err) => {
        setToastMessage(err.message);
        console.log(err);
        setShowToast(true);
      });
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
            handleTaskCreated={handleTaskCreated}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
          />
          <SideBarMobile
            handleTaskCreated={handleTaskCreated}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
          />
          <div className="text-gray-800 md:pl-72  flex-1 ">
            <NavBar
              handleTaskCreated={handleTaskCreated}
              setIsSideBarOpen={setIsSideBarOpen}
            />
            <TaskList
              tasksData={tasksData}
              handleViewSpecificTask={handleViewSpecificTask}
            />
            <CreateTask
              modalTaskData={modalTaskData}
              setModalTaskData={setModalTaskData}
              setFinish={setFinish}
              finish={finish}
              setToastMessage={setToastMessage}
              setShowToast={setShowToast}
              onTaskCreated={handleTaskCreated}
              taskType={taskType}
            />
          </div>
        </div>
      )}
      <TaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleTaskCreated={handleTaskCreated}
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

export default TaskNote;
