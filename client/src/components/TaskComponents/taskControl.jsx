import React from "react";
import { deleteTask, updateTask } from "../utils/apiUtilsTask";
import { useEffect } from "react";
import {
  FaTrash,
  FaCheck,
  FaRegCheckCircle,
  FaRegCircle,
} from "react-icons/fa";

const TaskControl = ({
  url,
  modalTaskData,
  handleTaskCreated,
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
    if (!isModalOpen && modalTaskData._id !== undefined) {
      handleUpdateTask(modalTaskData._id);
      handleTaskCreated();
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
        <button
          onClick={() => setFinish(!finish)}
          className=" transform absolute top-[8%] right-[4%] hover:scale-[1.04] transition duration-100"
        >
          {!finish ? (
            <FaRegCircle className="text-red-500" size="1.5rem" />
          ) : (
            <FaRegCheckCircle className="text-green-500" size="1.5rem" />
          )}
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

export default TaskControl;
