import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import TaskInputBox from "./taskInputBox";

const TaskModal = ({
  isModalOpen,
  singleTaskData,
  handleTaskCreated,
  setIsModalOpen,
  finish,
  setFinish,
  url,
  modalTaskData,
  setModalTaskData,
  Axios,
}) => {
  return (
    <>
      {singleTaskData && (
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" onClose={() => setIsModalOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm" />
            </Transition.Child>
            <div className="fixed inset-0 z-50">
              <div className="relative flex min-h-full items-center justify-center p-6 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="flex flex-col w-full max-w-[35rem] bg-white p-4 rounded-lg">
                    <TaskInputBox
                      url={url}
                      singleTaskData={singleTaskData}
                      modalTaskData={modalTaskData}
                      setModalTaskData={setModalTaskData}
                      setFinish={setFinish}
                      handleTaskCreated={handleTaskCreated}
                      finish={finish}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      Axios={Axios}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default TaskModal;
