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
    <div className="fixed bottom-[1.5rem] right-[2rem] md:bottom-[3rem] md:right-[4rem]">
      <button onClick={() => handleToggleCreateModal()}>
        <div
          className="ring ring-1 ring-neutral-400 dark:ring-neutral-600 transform transition duration-100 hover:-translate-y-[4px] hover:scale-[1.02] bg-neutral-800 dark:bg-neutral-300 p-4 rounded-full shadow hover:shadow-md hover:shadow-neutral-400
        dark:hover:shadow-neutral-900  "
        >
          <FaPen className="h-8 w-8 md:h-10 md:w-10 text-neutral-300 dark:text-neutral-800" />
        </div>
      </button>
      <CreateTaskModal
        handleToggleCreateModal={handleToggleCreateModal}
      ></CreateTaskModal>
    </div>
  );
};

export default CreateTask;
