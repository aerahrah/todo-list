import { useDispatch, useSelector } from "react-redux";
import { toggleRefetchTaskData } from "../../../store/slices/taskSlice/fetchTaskSlice";
import { createTask } from "../../../api/taskAPI";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../../store/slices/toastSlice";

import TaskModal from "../../../components/taskModal";
import TaskInputBox from "../taskInputBox";

const CreateTaskModal = ({ handleToggleCreateModal }) => {
  const dispatch = useDispatch();
  const { taskType, projectId } = useSelector((state) => state.filter);
  const { createTaskModal } = useSelector((state) => state.modal);
  const { theme } = useSelector((state) => state.theme);

  const handleCreateTask = (formData) => {
    dispatch(createTask({ projectId, formData, taskType }))
      .then(() => {
        dispatch(toggleRefetchTaskData());
        handleToggleCreateModal();
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
        handleSubmitFunction={handleCreateTask}
        theme={theme}
        modalType="Add"
      >
        <div className="w-full flex justify-between gap-6 items-center text-gray-800 px-2">
          <button
            type="button"
            className=" w-full bg-neutral-300/80 rounded py-1.5"
            onClick={() => handleToggleCreateModal()}
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Add"
            className="cursor-pointer w-full bg-blue-500 rounded py-1.5 text-neutral-100"
          />
        </div>
      </TaskInputBox>
    </TaskModal>
  );
};

export default CreateTaskModal;
