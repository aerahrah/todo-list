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
import DarkModeBtn from "./darkmodeBtn";

const NavBar = ({ setIsSideBarOpen }) => {
  return (
    <div className="fixed w-full top-0 z-30 m-0 md:pr-72 shadow bg-white ">
      <div className="w-full flex items-center relative bg-white z-30 px-4 md:px-6 shadow">
        <div className="md:hidden  block pr-4 border-r-[2px] py-5 ">
          <FaBars
            className="text-blue-950"
            size="1.25rem"
            onClick={() => setIsSideBarOpen(true)}
          />
        </div>
        <div className="flex items-center w-full gap-3">
          <DarkModeBtn />
          <TaskSortPopOver FaFilter={FaFilter} FaAngleDown={FaAngleDown} />
          <TaskSearchBar FaSearch={FaSearch} />
          <Signout FaSignOutAlt={FaSignOutAlt} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
