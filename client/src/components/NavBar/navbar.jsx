import {
  FaSearch,
  FaBars,
  FaSignOutAlt,
  FaFilter,
  FaAngleDown,
} from "react-icons/fa";
import TaskSortPopOver from "./taskSortPopOver";
import TaskSearchBar from "./TaskSearchBar";
import Signout from "./signout";
import { useState } from "react";
const NavBar = ({
  handleTaskCreated,
  setFilteredTask,
  setSortByTask,
  setIsSideBarOpen,
}) => {
  return (
    <div>
      <div
        className={`px-4 md:px-6 m-0 bg-white shadow md:shadow-md flex items-center`}
      >
        <div className="md:hidden block pr-4 border-r-[2px] py-5 ">
          <FaBars
            className="text-blue-950"
            size="1.25rem"
            onClick={() => setIsSideBarOpen(true)}
          />
        </div>
        <div className="flex items-center w-full">
          <TaskSortPopOver
            setSortByTask={setSortByTask}
            handleTaskCreated={handleTaskCreated}
            useState={useState}
            FaFilter={FaFilter}
            FaAngleDown={FaAngleDown}
          />
          <TaskSearchBar
            setFilteredTask={setFilteredTask}
            handleTaskCreated={handleTaskCreated}
            FaSearch={FaSearch}
            useState={useState}
          />
          <Signout FaSignOutAlt={FaSignOutAlt} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
