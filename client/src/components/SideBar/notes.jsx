import { FaStickyNote } from "react-icons/fa";
const Notes = ({ handleGetNoteTasks, taskType }) => {
  return (
    <div
      className={`flex mb-6 pl-10 rounded-md py-2 mx-auto w-[95%] tracking-tight gap-4 items-center hover:bg-blue-200/50 hover:cursor-pointer ${
        taskType === "notes" ? "bg-blue-200/50" : ""
      }`}
      onClick={handleGetNoteTasks}
    >
      <FaStickyNote />
      <h2 className="text-2xl font-semibold  ">Notes</h2>
    </div>
  );
};
export default Notes;
