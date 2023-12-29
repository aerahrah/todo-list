const TaskSortPopOverContent = ({ handleSortChange, Popover, Transition }) => {
  const filterOption = ["all tasks", "completed", "incomplete"];
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Popover.Panel className="absolute mt-2 border-[1px] bg-white p-4 shadow-md rounded-lg right-[50%] ring ring-1 ring-neutral-300 transform translate-x-[50%] ">
        {filterOption.map((option) => (
          <Popover.Button
            className="hover:border-blue-950 border-b-[1px] w-full text-left pb-1.5 capitalize font-semibold"
            key={option}
            onClick={() => handleSortChange(option)}
          >
            {option}
          </Popover.Button>
        ))}
      </Popover.Panel>
    </Transition>
  );
};
export default TaskSortPopOverContent;
