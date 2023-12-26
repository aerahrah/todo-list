import React from "react";
import { deleteTask, updateTask } from "../../api/taskAPI";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSingleTaskData } from "../../store/slices/taskSlice/fetchTaskSlice";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../store/slices/toastSlice";
import {
  FaTrash,
  FaCheck,
  FaRegCheckCircle,
  FaRegCircle,
} from "react-icons/fa";

const TaskControl = ({
  url,
  handleTaskCreated,
  singleTaskData,
  setFinish,
  taskName,
  taskTitle,
  finish,
  setIsModalOpen,
  isModalOpen,
  Axios,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isModalOpen && singleTaskData._id) {
      handleUpdateTask(singleTaskData._id);
      handleTaskCreated();
    }
  }, [singleTaskData, isModalOpen]);

  const handleDeleteTask = (id) => {
    deleteTask(url, id, Axios)
      .then(() => {
        dispatch(clearSingleTaskData());
        setIsModalOpen(false);
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

  const handleUpdateTask = (id) => {
    updateTask(url, id, taskName, taskTitle, finish, Axios)
      .then(() => {
        dispatch(clearSingleTaskData());
        setIsModalOpen(false);
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
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
            <FaRegCircle className="text-red-700" size="1.5rem" />
          ) : (
            <FaRegCheckCircle className="text-blue-700" size="1.5rem" />
          )}
        </button>
        <button onClick={() => handleDeleteTask(singleTaskData._id)}>
          <FaTrash className="hover:text-red-500" />
        </button>
      </div>

      <button onClick={() => handleUpdateTask(singleTaskData._id)}>
        <FaCheck className="hover:text-sky-500" />
      </button>
    </div>
  );
};

export default TaskControl;
