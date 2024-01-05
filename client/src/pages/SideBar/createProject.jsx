import { createProject } from "../../api/projectAPI";
import { Popover, Transition } from "@headlessui/react";
import { toggleRefetchProjectData } from "../../store/slices/projectSlice/fetchProjectSlice";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const CreateProject = () => {
  const dispatch = useDispatch();
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [title, setTitle] = useState("");
  const handleCreateProject = () => {
    dispatch(createProject(title))
      .then(() => {
        setTitle("");
        dispatch(toggleRefetchProjectData());
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

  return (
    <Popover>
      <Popover.Button
        className={`flex items-center gap-4 pl-10 font-semibold text-lg mt-1 hover:bg-neutral-300 hover:dark:bg-neutral-900/50 text-left py-2
          mx-auto rounded-lg w-full outline-0 ${
            isButtonFocused
              ? "focus:bg-neutral-300  focus:dark:bg-neutral-900/50"
              : ""
          }`}
        onClick={() => setIsButtonFocused(true)}
        onBlur={() => setIsButtonFocused(false)}
      >
        <FaPlus /> Add Project
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel>
          <div className="mt-2 bg-white border-blue-950 border-[1px] p-4 rounded-lg mx-1">
            <input
              className="outline-0 p-1 focus:border-blue-950 border-b-2 w-full"
              type="text"
              placeholder="Add project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mt-2 flex justify-between">
              <Popover.Button className="hover:text-red-500 transform hover:scale-[1.02] ">
                cancel
              </Popover.Button>
              <Popover.Button
                className="hover:text-blue-500 transform hover:scale-[1.02] "
                onClick={handleCreateProject}
              >
                create
              </Popover.Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default CreateProject;