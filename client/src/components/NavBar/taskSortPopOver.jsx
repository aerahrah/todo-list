import { Popover, Transition } from "@headlessui/react";
import TaskSortPopOverContent from "./taskSortPopOverContent";
const TaskSortPopOver = ({
  setSortByTask,
  handleTaskCreated,
  useState,
  FaFilter,
  FaAngleDown,
}) => {
  const [sortBy, setSortBy] = useState("Filter");

  const handleSortChange = (value) => {
    setSortBy(value);
    setSortByTask(value);
    handleTaskCreated();
  };

  return (
    <div className="mx-2 md:mr-4">
      <Popover className="relative z-10 md:hidden">
        <Popover.Button className="md:hidden w-full p-2.5 border-[1px] rounded-lg">
          <FaFilter className="text-gray-600" />
        </Popover.Button>
        <TaskSortPopOverContent
          handleSortChange={handleSortChange}
          Popover={Popover}
          Transition={Transition}
        />
      </Popover>
      <Popover className="relative z-30 hidden md:block">
        <Popover.Button className=" w-full p-2 border-[1px] rounded-lg border-2 hidden md:block">
          <div className="flex items-center justify-between">
            <p className="capitalize whitespace-nowrap w-[80px]">{sortBy}</p>
            <FaAngleDown />
          </div>
        </Popover.Button>
        <TaskSortPopOverContent
          handleSortChange={handleSortChange}
          Popover={Popover}
          Transition={Transition}
        />
      </Popover>
    </div>
  );
};

export default TaskSortPopOver;
