import { Popover, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSortTask } from "../../store/slices/filterSlice";
import { toggleRefetchTaskData } from "../../store/slices/taskSlice/fetchTaskSlice";
import TaskSortPopOverContent from "./taskSortPopOverContent";

const TaskSortPopOver = ({ FaFilter, FaAngleDown }) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Filter");
  const handleSortChange = (value) => {
    setSortBy(value);
    dispatch(setSortTask(value));
    dispatch(toggleRefetchTaskData());
  };

  return (
    <div>
      <Popover className="relative z-10 md:hidden">
        <Popover.Button className="md:hidden w-full p-2.5 rounded-full bg-neutral-200 ring ring-1 ring-neutral-300 dark:ring-neutral-700 dark:bg-neutral-900 hover:bg-neutral-300/80 hover:dark:bg-neutral-900/60">
          <FaFilter className="h-5 w-5" />
        </Popover.Button>
        <TaskSortPopOverContent
          handleSortChange={handleSortChange}
          Popover={Popover}
          Transition={Transition}
        />
      </Popover>
      <Popover className="relative z-30 hidden md:block">
        <Popover.Button className=" w-full p-1.5 px-2 ring ring-1 ring-neutral-300 bg-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700/70 text-lg  rounded-full font-semibold hidden md:block tracking-tight outline-0 hover:bg-neutral-300/80 hover:dark:bg-neutral-900/60">
          <div className="flex items-center gap-2 justify-between">
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
