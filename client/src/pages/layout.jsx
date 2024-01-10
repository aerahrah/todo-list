import React, { useState, useEffect } from "react";
import { getAllTask } from "../api/taskAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../store/slices/toastSlice";

import Axios from "../utils/axios";
import Toast from "../components/toast";
import UpdateTaskModal from "./TaskComponents/updateTask/updateTaskModal";
import CreateTask from "../pages/TaskComponents/createTask/createTaskBtn";
import Spinner from "../components/spinner";
import SideBarContent from "./SideBar/sideBarContent";
import SideBarMobile from "../pages/SideBar/sideBarMobile";
import NavBar from "../components/NavBar/navbar";
import TaskList from "../pages/taskComponents/taskList";

const TaskNote = () => {
  const url = "http://localhost:3500/api/v1";
  const dispatch = useDispatch();
  const { filterTask, sortTask, taskType, projectId } = useSelector(
    (state) => state.filter
  );
  const { refetchData } = useSelector((state) => state.fetch);
  const { toastMessage, displayToast } = useSelector((state) => state.toast);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAllTask = async () => {
    try {
      dispatch(getAllTask({ filterTask, sortTask, projectId, taskType }));
      setIsLoading(false);
    } catch (err) {
      dispatch(setToastMessage(err.message));
      dispatch(toggleDisplayToast());
    }
  };

  const handleToggleDisplayToast = () => {
    dispatch(toggleDisplayToast());
  };

  useEffect(() => {
    handleGetAllTask();
  }, [refetchData]);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen bg-white dark:bg-neutral-900">
          <Spinner />
        </div>
      ) : (
        <div className="w-full">
          <SideBarContent isMobileView={false} />
          <SideBarMobile />
          <div className="min-h-screen text-neutral-800 md:pl-72 w-full  flex-1  relative">
            <NavBar />
            <TaskList />
            <CreateTask />
          </div>
        </div>
      )}
      <UpdateTaskModal Axios={Axios} />
      {displayToast && (
        <Toast message={toastMessage} onClose={handleToggleDisplayToast} />
      )}
    </div>
  );
};

export default TaskNote;
