import { deleteTask, updateTask } from "../../api/taskAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSingleTaskData } from "../../store/slices/taskSlice/fetchTaskSlice";
import { toggleUpdateTaskModal } from "../../store/slices/modalSlice";
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
import TaskModal from "../../components/taskModal";
import TaskInputBox from "./taskInputBox";
import React from "react";

const UpdateTaskModal = ({
  isModalOpen,
  handleTaskCreated,
  setIsModalOpen,
  finish,
  setFinish,
  url,
  Axios,
}) => {
  const dispatch = useDispatch();
  const { singleTaskData } = useSelector((state) => state.fetch);
  const { updateTaskModal } = useSelector((state) => state.modal);
  useEffect(() => {
    if (!isModalOpen && singleTaskData._id) {
      handleUpdateTask(singleTaskData._id);
      handleTaskCreated();
    }
  }, [singleTaskData, isModalOpen]);

  const handleToggleUpdateModal = () => {
    dispatch(toggleUpdateTaskModal());
  };

  const handleDeleteTask = (id) => {
    deleteTask(url, id, Axios)
      .then(() => {
        dispatch(clearSingleTaskData());
        dispatch(toggleUpdateTaskModal());
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

  const handleUpdateTask = (id, taskContent) => {
    updateTask(url, id, taskContent, finish, Axios)
      .then(() => {
        dispatch(clearSingleTaskData());
        dispatch(toggleUpdateTaskModal());
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };
  return (
    <TaskModal
      isModalOpen={updateTaskModal}
      toggleModal={handleToggleUpdateModal}
    >
      <TaskInputBox singleTaskData={singleTaskData} />
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
    </TaskModal>
  );
};

export default UpdateTaskModal;
