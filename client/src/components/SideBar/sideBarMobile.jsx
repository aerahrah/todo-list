import { Dialog, Transition } from "@headlessui/react";
import { toggleIsSidebarOpen } from "../../store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import SideBarContent from "./sideBarContent";

const SideBarMobile = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { isSideBarOpen } = useSelector((state) => state.modal);

  const handleToggleSideBar = () => {
    dispatch(toggleIsSidebarOpen());
  };
  return (
    <Transition appear show={isSideBarOpen}>
      <Dialog
        as="div"
        onClose={() => handleToggleSideBar()}
        className="md:hidden relative"
      >
        <Transition.Child
          enter="transition ease-in-out duration-300 transform "
          enterFrom={`-translate-x-full fixed inset-y-0  text-neutral-800  border-blue-950 border-r-[1px]  z-30 ${
            theme === "light"
              ? "bg-white border-neutral-500"
              : "bg-neutral-800 border-neutral-700"
          }`}
          enterTo={`translate-x-0 fixed inset-y-0  text-neutral-800 border-blue-950 border-r-[1px]  z-30 ${
            theme === "light"
              ? "bg-white border-neutral-500"
              : "bg-neutral-800 border-neutral-700"
          }`}
          leave="transition ease-in-out duration-300 transform"
          leaveFrom={`translate-x-0 fixed inset-y-0  text-neutral-800 border-blue-950 border-r-[1px]  z-30 ${
            theme === "light"
              ? "bg-white border-neutral-500"
              : "bg-neutral-800 border-neutral-700"
          }`}
          leaveTo={`-translate-x-full fixed inset-y-0  text-neutral-800  border-r-[1px]  z-30 ${
            theme === "light"
              ? "bg-white border-neutral-500"
              : "bg-neutral-800 border-neutral-700"
          }`}
        >
          <div>
            <i
              className={`absolute top-[.5rem] right-[.5rem] z-50 p-1 ring ring-1 ring-neutral-700  rounded-full ring-neutral-500 ${
                theme === "light" ? " text-neutral-600" : "text-neutral-400"
              }`}
              onClick={() => handleToggleSideBar()}
            >
              <FaTimes className="h-5 w-5" />
            </i>
            <SideBarContent isMobileView={true} />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SideBarMobile;
