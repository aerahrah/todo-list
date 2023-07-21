import { Fragment } from "react";
import { useState, useEffect } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import TaskSortDropdown from "./taskSortDropdown";

const TaskSearchBar = ({
  handleTaskCreated,
  setFilteredTask,
  setSortByTask,
  setIsSideBarOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredTask(e.target.value);
    handleTaskCreated();
  };

  return (
    <div>
      <div className={`p-0 px-6 m-0 shadow-md flex items-center`}>
        <FaBars
          className="md:hidden block mr-3"
          size="1.5rem"
          onClick={() => setIsSideBarOpen(true)}
        />
        <TaskSortDropdown
          setSortByTask={setSortByTask}
          handleTaskCreated={handleTaskCreated}
        />
        <FaSearch className="text-gray-600"></FaSearch>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search anything"
          className="outline-0 w-full p-4 text-lg"
        />
      </div>
    </div>
  );
};

export default TaskSearchBar;
