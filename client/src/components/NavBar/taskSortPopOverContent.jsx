import { useDispatch, useSelector } from "react-redux";
const TaskSortPopOverContent = ({ handleSortChange, Popover, Transition }) => {
  const { theme } = useSelector((state) => state.theme);
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
      <Popover.Panel
        className={`absolute mt-2   p-4 shadow-lg rounded-lg right-[50%] ring ring-1  transform translate-x-[50%] ${
          theme === "light"
            ? "bg-white ring-neutral-300"
            : "bg-neutral-900  ring-neutral-800"
        }`}
      >
        {filterOption.map((option) => (
          <Popover.Button
            className={`border-b-[1px] w-full text-left pb-1.5 capitalize font-semibold ${
              theme === "light"
                ? "border-neutral-300 hover:border-neutral-800"
                : "border-neutral-800 hover:border-neutral-300 "
            }`}
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
