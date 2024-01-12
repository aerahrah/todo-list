import { createProject } from "../../api/projectAPI";
import { Popover } from "@headlessui/react";
import { toggleRefetchProjectData } from "../../store/slices/projectSlice/fetchProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../store/slices/toastSlice";
import PopoverCard from "./popoverCard";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [title, setTitle] = useState("");
  const handleCreateProject = () => {
    dispatch(createProject(title))
      .then((response) => {
        if (response.type === "createProject/rejected") {
          dispatch(setToastMessage(response.error.message));
          dispatch(toggleDisplayToast());
        } else {
          setTitle("");
          dispatch(toggleRefetchProjectData());
        }
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
      <PopoverCard>
        <input
          className={`outline-0 p-1 w-full rounded ring ring-1  ${
            theme === "light"
              ? "bg-neutral-100 ring-neutral-400"
              : "bg-neutral-900 ring-neutral-800"
          }`}
          type="text"
          placeholder="Add project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-2 flex justify-between ">
          <Popover.Button className="hover:text-red-500 transform hover:scale-[1.02] capitalize">
            cancel
          </Popover.Button>
          <Popover.Button
            className="hover:text-blue-500 transform hover:scale-[1.02] capitalize"
            onClick={handleCreateProject}
          >
            create
          </Popover.Button>
        </div>
      </PopoverCard>
    </Popover>
  );
};
export default CreateProject;
