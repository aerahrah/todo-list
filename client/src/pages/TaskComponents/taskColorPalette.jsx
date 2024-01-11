import { Popover, Transition } from "@headlessui/react";
import { colorOption } from "../../utils/getColorOption";
import { getColorOption } from "../../utils/getColorOption";

const TaskColorPalette = ({ theme, setColorTheme }) => {
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
        className={`absolute flex flex-wrap right-0 w-[12.5rem] gap-2 ring ring-1.5 rounded-lg  p-3 ${
          theme === "light"
            ? "bg-neutral-100 ring-neutral-300"
            : "bg-neutral-800  ring-neutral-700"
        }`}
      >
        {colorOption.map((color) => (
          <Popover.Button
            className={` ${
              theme === "light"
                ? "border-neutral-300 hover:border-neutral-800"
                : "border-neutral-800 hover:border-neutral-300 "
            }`}
            key={color}
            onClick={() => setColorTheme(color)}
          >
            <div
              className={`p-1  rounded-full ring ring-1 ring-neutral-300 ${
                theme === "light" ? "ring-neutral-300" : " ring-neutral-700"
              }`}
            >
              <div
                className="h-7 w-7 rounded-full"
                style={{
                  background: getColorOption(color),
                }}
              ></div>
            </div>
          </Popover.Button>
        ))}
      </Popover.Panel>
    </Transition>
  );
};

export default TaskColorPalette;
