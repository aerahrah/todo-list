import { Popover, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import PopoverCard from "./popoverCard";
const UpdateProjectPopover = ({
  title,
  setTitle,
  handleUpdateProject,
  projectId,
}) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <PopoverCard>
      <input
        className={`outline-0 p-1 w-full rounded ring ring-1  ${
          theme === "light"
            ? "bg-neutral-100 ring-neutral-400"
            : "bg-neutral-900 ring-neutral-800"
        }`}
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
    </PopoverCard>
  );
};
export default UpdateProjectPopover;
