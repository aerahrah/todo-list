import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
const TaskCard = ({
  taskId,
  taskName,
  taskTitle,
  taskCompleted,
  handleViewSpecificTask,
}) => {
  return (
    <ul
      className="bg-white min-w-full max-w-md p-2 rounded-xl border-[1px] shadow-sm hover:shadow mb-4 overflow-hidden max-h-60 cursor-pointer relative"
      onClick={() => handleViewSpecificTask(taskId)}
    >
      <li className="my-2 text-lg font-semibold">{taskTitle}</li>
      <li className="mb-2 text-md break-words overflow-y-auto max-h-40">
        {taskName}
      </li>
      <li className="absolute top-[8%] right-[4%] ">
        {!taskCompleted ? (
          <FaRegCircle className="text-red-500" size="1.25rem" />
        ) : (
          <FaRegCheckCircle className="text-green-500" size="1.25rem" />
        )}
      </li>
    </ul>
  );
};

export default TaskCard;
