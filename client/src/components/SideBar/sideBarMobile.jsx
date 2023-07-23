import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SideBarContent from "./sideBarContent";
const SideBarMobile = ({
  setProjectTitle,
  handleTaskCreated,
  isSideBarOpen,
  setIsSideBarOpen,
  setToastMessage,
  setShowToast,
}) => {
  return (
    <Transition appear show={isSideBarOpen}>
      <Dialog
        as="div"
        onClose={() => setIsSideBarOpen(false)}
        className="md:hidden"
      >
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full fixed inset-y-0 bg-blue-400 text-gray-800"
          enterTo="translate-x-0 fixed inset-y-0 bg-blue-400 text-gray-800"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0 fixed inset-y-0 bg-blue-400 text-gray-800"
          leaveTo="-translate-x-full fixed inset-y-0 bg-blue-400 text-gray-800"
        >
          <div>
            <SideBarContent
              setProjectTitle={setProjectTitle}
              handleTaskCreated={handleTaskCreated}
              setToastMessage={setToastMessage}
              setShowToast={setShowToast}
              isMobileView={true}
            />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SideBarMobile;
