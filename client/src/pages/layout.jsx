import React, { useState, useEffect } from "react";
import { getAllTask } from "../api/taskAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../store/slices/toastSlice";
import { setSingleTaskData } from "../store/slices/taskSlice/fetchTaskSlice";
import Axios from "../utils/axios";
import Toast from "../components/toast";
import UpdateTaskModal from "./TaskComponents/updateTaskModal";
import CreateTask from "../pages/TaskComponents/createTask/createTaskBtn";
import Spinner from "../components/spinner";
import SideBar from "../pages/SideBar/sidebar";
import SideBarMobile from "../pages/SideBar/sideBarMobile";
import NavBar from "../components/NavBar/navbar";
import TaskList from "../pages/taskComponents/taskList";

const TaskNote = () => {
  const url = "http://localhost:3500/api/v1";
  const dispatch = useDispatch();
  const { filterTask, sortTask, taskType, projectId } = useSelector(
    (state) => state.filter
  );
  const { toastMessage, displayToast } = useSelector((state) => state.toast);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleGetAllTask = async () => {
    try {
      dispatch(getAllTask({ filterTask, sortTask, projectId, taskType }));
      setIsLoading(false);
    } catch (err) {
      dispatch(setToastMessage(err.message));
      dispatch(toggleDisplayToast());
    }
  };

  const handleTaskCreated = () => {
    setUpdateTrigger((prevTrigger) => !prevTrigger);
  };

  const handleToggleDisplayToast = () => {
    dispatch(toggleDisplayToast());
  };

  useEffect(() => {
    handleGetAllTask();
  }, [updateTrigger]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <SideBar handleTaskCreated={handleTaskCreated} />
          <SideBarMobile
            handleTaskCreated={handleTaskCreated}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
          <div className="min-h-screen text-gray-800 md:pl-72  flex-1 ">
            <NavBar
              handleTaskCreated={handleTaskCreated}
              setIsSideBarOpen={setIsSideBarOpen}
            />
            <TaskList />
            <CreateTask onTaskCreated={handleTaskCreated} taskType={taskType} />
          </div>
        </div>
      )}
      <UpdateTaskModal
        handleTaskCreated={handleTaskCreated}
        Axios={Axios}
      />
      {displayToast && (
        <Toast message={toastMessage} onClose={handleToggleDisplayToast} />
      )}
    </div>
  );
};

export default TaskNote;
