import { FaPlus } from "react-icons/fa";
import { Popover, Transition } from "@headlessui/react";

const UpdateProjectPopover = ({
  title,
  setTitle,
  handleUpdateProject,
  projectId,
}) => {
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
        <div className="mt-2 bg-white border-blue-950 border-[1px] p-4 rounded-lg mx-1">
          <input
            className="outline-0 p-1  focus:border-blue-950 border-b-2 w-full"
            type="text"
            placeholder={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mt-2 flex justify-between">
            <Popover.Button className="hover:text-red-500 transform hover:scale-[1.02] ">
              cancel
            </Popover.Button>
            <Popover.Button
              className="hover:text-blue-500 transform hover:scale-[1.02] "
              onClick={() => handleUpdateProject(projectId)}
            >
              Update
            </Popover.Button>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};
export default UpdateProjectPopover;
