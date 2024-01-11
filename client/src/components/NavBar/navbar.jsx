import {
  FaSearch,
  FaBars,
  FaSignOutAlt,
  FaFilter,
  FaAngleDown,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleIsSidebarOpen } from "../../store/slices/modalSlice";
import TaskSortPopOver from "./taskSortPopOver";
import TaskSearchBar from "./TaskSearchBar";
import Signout from "./signout";
import DarkModeBtn from "./darkmodeBtn";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleToggleSideBar = () => {
    dispatch(toggleIsSidebarOpen());
  };

  return (
    <div className="fixed w-full top-0 z-30 m-0 md:pr-72 shadow bg-white ">
      <div className="w-full flex items-center relative bg-white dark:bg-neutral-800 z-30 shadow text-neutral-800 dark:text-neutral-300 relative px-3 md:px-4 lg:px-6">
        <div className="md:hidden block pr-3 border-r-[2px] border-neutral-300 dark:border-neutral-700 py-5 mr-1.5">
          <FaBars className=" h-5 w-5" onClick={() => handleToggleSideBar()} />
        </div>
        <div className="flex items-center w-full gap-1.5 md:gap-3 text-lg text-neutral-700 dark:text-neutral-300 ">
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
