import { useDispatch } from "react-redux";
import { useState } from "react";
import { setFilterTask } from "../../store/slices/filterSlice";
import { toggleRefetchData } from "../../store/slices/taskSlice/fetchTaskSlice";

const TaskSearchBar = ({ FaSearch }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setFilterTask(e.target.value));
    dispatch(toggleRefetchData());
  };

  return (
    <div className="text-neutral-700  relative flex items-center w-full py-3 mr-4 md:mr-6 ">
      <FaSearch className="absolute left-[.5rem] " />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
        className="outline-0 w-full ring ring-1 ring-neutral-300 p-1.5 pl-8 px-2 text-lg rounded-full bg-blue-50 shadow-inner bg-neutral-200"
      />
    </div>
  );
};

export default TaskSearchBar;
