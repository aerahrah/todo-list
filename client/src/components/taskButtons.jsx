import React from "react";
import { deleteTask, updateTask } from "./utils/apiUtils";
import Toast from "./toast";
import { useEffect } from "react";

const TaskButtons = ({
  url,
  modalTaskData,
  setFinish,
  taskName,
  taskTitle,
  finish,
  setToastMessage,
  setShowToast,
  setIsModalOpen,
}) => {
  useEffect(() => {
    console.log(modalTaskData._id);
    if (modalTaskData._id !== undefined) {
      handleUpdateTask(modalTaskData._id);
    }
  }, [modalTaskData]);

  const handleDeleteTask = (id) => {
    deleteTask(url, id)
      .then((data) => {
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTask = (id) => {
    updateTask(url, id, taskName, taskTitle, finish)
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
      <button onClick={() => handleUpdateTask(modalTaskData._id)}>
        update
      </button>
      <button onClick={() => handleDeleteTask(modalTaskData._id)}>
        delete
      </button>
      <button onClick={() => setIsModalOpen(false)}>close</button>
    </div>
  );
};

export default TaskButtons;
