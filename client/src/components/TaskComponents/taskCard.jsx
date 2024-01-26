import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import {
  setSingleTaskData,
  setSingleTaskDataIsComplete,
} from "../../store/slices/taskSlice/fetchTaskSlice";
import { toggleUpdateTaskModal } from "../../store/slices/modalSlice";
import { getColorOption, getTextColorOption } from "../../utils/getColorOption";
import { useDispatch } from "react-redux";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const handleViewSpecificTask = (task) => {
    dispatch(setSingleTaskData(task));
    dispatch(setSingleTaskDataIsComplete(task.completed));
    dispatch(toggleUpdateTaskModal());
  };

  return (
    <ul
      className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 ring ring-1 ring-neutral-300 dark:ring-neutral-700/70 min-w-full max-w-md py-2 md:px-4 rounded-xl   shadow hover:shadow mb-4 px-3 overflow-hidden max-h-96 cursor-pointer relative"
      style={{
        background: getColorOption(task.color),
        color: getTextColorOption(task.color),
      }}
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
