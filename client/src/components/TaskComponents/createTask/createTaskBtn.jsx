import { FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleCreateTaskModal } from "../../../store/slices/modalSlice";
import CreateTaskModal from "./createTaskModal";

const CreateTask = () => {
  const dispatch = useDispatch();
  const handleToggleCreateModal = () => {
    dispatch(toggleCreateTaskModal());
  };

  return (
    <div className="fixed bottom-[3rem] right-[4rem]">
      <button onClick={() => handleToggleCreateModal()}>
        <div
          className="transform transition duration-100 hover:-translate-y-[4px] hover:scale-[1.02] bg-neutral-800 dark:bg-neutral-300 p-4 rounded-full shadow-sm hover:shadow-md hover:shadow-neutral-400
        dark:hover:shadow-neutral-900  "
        >
          <FaPen
            size="34px"
            className="text-neutral-300 dark:text-neutral-800"
          />
        </div>
      </button>
      <CreateTaskModal
        handleToggleCreateModal={handleToggleCreateModal}
      ></CreateTaskModal>
    </div>
  );
};

export default CreateTask;
