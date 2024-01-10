import { FaStickyNote } from "react-icons/fa";
const Notes = ({ handleGetNoteTasks, taskType, theme }) => {
  return (
    <div
      className={`flex mb-6 pl-10 rounded-md py-2 mx-auto w-[95%] tracking-tight gap-4 hover:bg-neutral-300 hover:dark:bg-neutral-900/50 items-center   hover:cursor-pointer ${
        taskType === "notes"
          ? theme === "light"
            ? "bg-neutral-300 hover:bg-neutral-300"
            : "bg-neutral-900/50 hover:bg-neutral-900/50"
          : ""
      }`}
      onClick={handleGetNoteTasks}
    >
      <FaStickyNote />
      <h2 className="text-2xl font-semibold  ">Notes</h2>
    </div>
  );
};
export default Notes;
