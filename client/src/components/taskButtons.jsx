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
    if (!isModalOpen && modalTaskData?._id !== undefined) {
      handleUpdateTask(modalTaskData._id);
      console.log(modalTaskData._id);
    }
  }, [modalTaskData, isModalOpen]);

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
    <div className="flex justify-between items-center text-gray-800 px-4">
      <div>
        <button onClick={() => setFinish(!finish)}>
          {!finish ? "not completed" : "completed"}
        </button>
        <button onClick={() => handleDeleteTask(modalTaskData._id)}>
          <FaTrash className="hover:text-red-500" />
        </button>
      </div>

      <button onClick={() => setIsModalOpen(false)}>
        <FaCheck className="hover:text-sky-500" />
      </button>
    </div>
  );
};

export default TaskButtons;
