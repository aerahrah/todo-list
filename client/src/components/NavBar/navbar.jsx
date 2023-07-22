import { FaSearch, FaBars } from "react-icons/fa";
import TaskSortDropdown from "./taskSortDropdown";
import TaskSearchBar from "./TaskSearchBar";
import { useState } from "react";
const NavBar = ({
  handleTaskCreated,
  setFilteredTask,
  setSortByTask,
  setIsSideBarOpen,
}) => {
  return (
    <div>
      <div className={`p-0 px-6 m-0 bg-white shadow-md flex items-center`}>
        <FaBars
          className="md:hidden block mr-3"
          size="1.5rem"
          onClick={() => setIsSideBarOpen(true)}
        />
        <TaskSortDropdown
          setSortByTask={setSortByTask}
          handleTaskCreated={handleTaskCreated}
          useState={useState}
        />
        <TaskSearchBar
          setFilteredTask={setFilteredTask}
          handleTaskCreated={handleTaskCreated}
          FaSearch={FaSearch}
          useState={useState}
        />
      </div>
    </div>
  );
};

export default NavBar;
