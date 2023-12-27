import { FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleCreateTaskModal } from "../../../store/slices/modalSlice";
import CreateTaskModal from "./createTaskModal";

const CreateTask = ({ onTaskCreated }) => {
  const dispatch = useDispatch();
  const handleToggleCreateModal = () => {
    dispatch(toggleCreateTaskModal());
  };

  return (
    <div className="fixed bottom-8 right-8">
      <button onClick={() => handleToggleCreateModal()}>
        <div className="transform transition duration-100 hover:-translate-y-[4px] hover:scale-[1.02] hover:bg-blue-400  bg-blue-300 p-4 rounded-full shadow-sm hover:shadow-md hover:shadow-gray-400 shadow-gray-400">
          <FaPen size="34px" className="text-blue-950" />
        </div>
      </button>
      <CreateTaskModal
        onTaskCreated={onTaskCreated}
        handleToggleCreateModal={handleToggleCreateModal}
      ></CreateTaskModal>
    </div>
  );
};

export default CreateTask;
