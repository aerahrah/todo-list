import { Popover, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSortTask } from "../../store/slices/filterSlice";
import { toggleRefetchData } from "../../store/slices/taskSlice/fetchTaskSlice";
import TaskSortPopOverContent from "./taskSortPopOverContent";

const TaskSortPopOver = ({ FaFilter, FaAngleDown }) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Filter");
  const handleSortChange = (value) => {
    setSortBy(value);
    dispatch(setSortTask(value));
    dispatch(toggleRefetchData());
  };

  return (
    <div>
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
        <Popover.Button className=" w-full p-2 ring ring-1 ring-neutral-300 bg-neutral-200 rounded-full font-semibold hidden md:block">
          <div className="flex items-center gap-1 justify-between">
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
