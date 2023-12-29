import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { setSingleTaskData } from "../../store/slices/taskSlice/fetchTaskSlice";
import { toggleUpdateTaskModal } from "../../store/slices/modalSlice";

import { useDispatch } from "react-redux";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const handleViewSpecificTask = (task) => {
    dispatch(setSingleTaskData(task));
    dispatch(toggleUpdateTaskModal());
  };

  return (
    <ul
      className="bg-white text-blue-950 min-w-full max-w-md py-2  md:px-4 rounded-xl  border-[1px] shadow-sm hover:shadow hover:border-gray-300 mb-4 px-2 overflow-hidden max-h-96 cursor-pointer relative"
      onClick={() => handleViewSpecificTask(task)}
    >
      <li className="my-2 text-lg font-semibold overflow-hidden">
        {task.title}
      </li>
      <li className="md:overflow-hidden  overflow-y-auto md:hover:overflow-y-auto mb-2 text-md break-words max-h-72">
        <div className="md:px-2">{task.name}</div>
      </li>
      <li className="absolute top-[.25rem] right-[.25rem] md:top-[.5rem] md:right-[.5rem] ">
        {!task.completed ? (
          <FaRegCircle className="text-red-700" />
        ) : (
          <FaRegCheckCircle className="text-blue-700" />
        )}
      </li>
    </ul>
  );
};

export default TaskCard;
