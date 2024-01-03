import { deleteTask, updateTask } from "../../../api/taskAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleTaskData,
  toggleRefetchData,
} from "../../../store/slices/taskSlice/fetchTaskSlice";
import { toggleUpdateTaskModal } from "../../../store/slices/modalSlice";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../../store/slices/toastSlice";
import { FaTrash, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import TaskModal from "../../../components/taskModal";
import TaskInputBox from "../taskInputBox";
import React from "react";

const UpdateTaskModal = () => {
  const dispatch = useDispatch();
  const { singleTaskData } = useSelector((state) => state.fetch);
  const [isTaskComplete, setIsTaskComplete] = useState(
    () => singleTaskData.completed
  );
  const { updateTaskModal } = useSelector((state) => state.modal);

  useEffect(() => {
    setIsTaskComplete(singleTaskData.completed);
  }, [singleTaskData.completed]);

  const handleToggleUpdateModal = () => {
    dispatch(toggleUpdateTaskModal());
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id))
      .then(() => {
        dispatch(clearSingleTaskData());
        dispatch(toggleRefetchData());
        handleToggleUpdateModal();
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

  const handleUpdateTask = (id, formData) => {
    console.log(formData);
    dispatch(updateTask({ id, formData, isTaskComplete }))
      .then(() => {
        dispatch(clearSingleTaskData());
        dispatch(toggleRefetchData());
        handleToggleUpdateModal();
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
      <TaskInputBox
        singleTaskData={singleTaskData}
        handleSubmitFunction={handleUpdateTask}
        modalType="Update"
      >
        <div className=" transform absolute top-[.75rem] right-[5%] ">
          <div className="flex items-center justify-center gap-3 bg-neutral-300/80 px-4 py-2 rounded-full">
            <button
              type="button"
              onClick={() => handleDeleteTask(singleTaskData._id)}
            >
              <FaTrash className="hover:text-red-500 h-6 -6" />
            </button>
            <button
              type="button"
              onClick={() => setIsTaskComplete(!isTaskComplete)}
            >
              {!isTaskComplete ? (
                <FaRegCircle className="text-red-600 h-6 w-6" />
              ) : (
                <FaRegCheckCircle className="text-blue-600 h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full flex justify-between gap-6 items-center text-gray-800 px-2">
          <button
            type="button"
            className=" w-full bg-neutral-300/80 rounded py-1.5"
            onClick={() => handleToggleUpdateModal()}
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Update"
            className="cursor-pointer w-full bg-blue-500 rounded py-1.5 text-neutral-100"
          />
        </div>
      </TaskInputBox>
    </TaskModal>
  );
};

export default UpdateTaskModal;
