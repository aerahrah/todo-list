import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createTask } from "../../../api/taskAPI";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../../store/slices/toastSlice";

import TaskModal from "../../../components/taskModal";
import TaskInputBox from "../taskInputBox";

const CreateTaskModal = ({ onTaskCreated, handleToggleCreateModal }) => {
  const dispatch = useDispatch();
  const { taskType, projectId } = useSelector((state) => state.filter);
  const { createTaskModal } = useSelector((state) => state.modal);
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const handleCreateTask = () => {
    createTask(taskTitle, taskName, projectId, taskType)
      .then(() => {
        setIsModalCreateOpen(false);
        setTaskName("");
        setTaskTitle("");
        onTaskCreated();
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

  return (
    <TaskModal
      isModalOpen={createTaskModal}
      toggleModal={handleToggleCreateModal}
    >
      <TaskInputBox
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskName={taskName}
        setTaskName={setTaskName}
      />
      <div className="flex justify-between px-6">
        <button
          className="hover:text-red-500 transform hover:scale-[1.02] "
          onClick={() => handleToggleCreateModal()}
        >
          Cancel
        </button>
        <button
          className="hover:text-blue-500 transform hover:scale-[1.02] "
          onClick={handleCreateTask}
        >
          Create
        </button>
      </div>
    </TaskModal>
  );
};

export default CreateTaskModal;
