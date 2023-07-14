import React from "react";
import { deleteTask, updateTask } from "./utils/apiUtils";
import { useEffect } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

const TaskButtons = ({
  url,
  modalTaskData,
  setModalTaskData,
  setFinish,
  taskName,
  taskTitle,
  finish,
  setToastMessage,
  setShowToast,
  setIsModalOpen,
  isModalOpen,
  Axios,
}) => {
  useEffect(() => {
    if (modalTaskData?._id !== undefined) {
      handleUpdateTask(modalTaskData._id);
      console.log(modalTaskData._id);
    }
  }, [modalTaskData]);

  const handleDeleteTask = (id) => {
    deleteTask(url, id, Axios)
      .then((data) => {
        setModalTaskData({});
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTask = (id) => {
    updateTask(url, id, taskName, taskTitle, finish, Axios)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setToastMessage(err.message);
        setShowToast(true);
      });
  };

  return (
    <div>
      <button onClick={() => setFinish(!finish)}>
        {!finish ? "not completed" : "completed"}
      </button>
      <button onClick={() => handleDeleteTask(modalTaskData._id)}>
        <FaTrash />
      </button>
      <button onClick={() => setIsModalOpen(false)}>
        <FaCheck />
      </button>
    </div>
  );
};

export default TaskButtons;
