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

const NavBar = ({ setIsSideBarOpen }) => {
  return (
    <div className="w-full">
      <div
        className={`fixed top-0 z-10  w-full px-4 md:px-6 m-0 bg-white shadow flex items-center`}
      >
        <div className="md:hidden block pr-4 border-r-[2px] py-5 ">
          <FaBars
            className="text-blue-950"
            size="1.25rem"
            onClick={() => setIsSideBarOpen(true)}
          />
        </div>
        <div className="flex items-center w-full">
          <TaskSortPopOver FaFilter={FaFilter} FaAngleDown={FaAngleDown} />
          <TaskSearchBar FaSearch={FaSearch} />
          <Signout FaSignOutAlt={FaSignOutAlt} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
