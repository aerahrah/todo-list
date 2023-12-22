import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
const TaskCard = ({ task, handleViewSpecificTask }) => {
  return (
    <ul
      className="bg-white text-blue-950 min-w-full max-w-md py-2  md:px-4 rounded-xl  border-[1px] shadow-sm hover:shadow hover:border-gray-300 mb-4 px-2 overflow-hidden max-h-60 cursor-pointer relative"
      onClick={() => handleViewSpecificTask(task._id)}
    >
      <li className="my-2 text-lg font-semibold overflow-hidden">
        {task.title}
      </li>
      <li className="md:overflow-hidden  overflow-y-auto md:hover:overflow-y-auto mb-2 text-md break-words max-h-40">
        <div className="md:px-2">{task.name}</div>
      </li>
      <li className="absolute top-[4%] right-[4%] md:top-[8%] md:right-[4%] ">
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
