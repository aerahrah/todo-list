import { Popover, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

const PopoverCard = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Popover.Panel className="block">
        <div
          className={`mt-2 p-4 rounded-lg  ${
            theme === "light" ? "bg-neutral-300" : "bg-neutral-900/50"
          }`}
        >
          {children}
        </div>
      </Popover.Panel>
    </Transition>
  );
};

export default PopoverCard;
