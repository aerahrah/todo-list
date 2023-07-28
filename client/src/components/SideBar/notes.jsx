import { FaStickyNote } from "react-icons/fa";
const Notes = ({ handleGetNoteTasks }) => {
  return (
    <div className="flex mb-6 pl-12 tracking-tight gap-4 items-center">
      <FaStickyNote />
      <h2
        className="text-2xl font-semibold hover:cursor-pointer"
        onClick={handleGetNoteTasks}
      >
        Notes
      </h2>
    </div>
  );
};
export default Notes;
