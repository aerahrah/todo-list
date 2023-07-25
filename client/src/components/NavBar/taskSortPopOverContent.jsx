const TaskSortPopOverContent = ({ handleSortChange, Popover, Transition }) => {
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Popover.Panel className="absolute mt-2 border-[1px] bg-white p-2 shadow-md rounded-lg right-[50%] transform translate-x-[50%]">
        <Popover.Button
          className="hover:font-semibold hover:border-blue-950 border-b-[1px] w-full text-left pb-1"
          onClick={() => handleSortChange("all task")}
        >
          All task
        </Popover.Button>
        <Popover.Button
          className="hover:font-semibold hover:border-blue-950 border-b-[1px] w-full text-left pb-1"
          onClick={() => handleSortChange("completed")}
        >
          Completed
        </Popover.Button>
        <Popover.Button
          className="hover:font-semibold hover:border-blue-950 border-b-[1px] w-full text-left pb-1"
          onClick={() => handleSortChange("incomplete")}
        >
          Incomplete
        </Popover.Button>
      </Popover.Panel>
    </Transition>
  );
};
export default TaskSortPopOverContent;
