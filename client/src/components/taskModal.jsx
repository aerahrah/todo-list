import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TaskButtons from "./taskButtons";

const TaskModal = ({
  isModalOpen,
  setIsModalOpen,
  taskName,
  setTaskName,
  taskTitle,
  setTaskTitle,
  finish,
  setFinish,
  url,
  modalTaskData,
  setToastMessage,
  setShowToast,
}) => {
  return (
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
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
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
                <input
                  type="text"
                  value={taskTitle}
                  placeholder={taskTitle ? taskTitle : "title"}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="outline-0 mb-2 text-lg font-semibold"
                />
                <textarea
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder={taskName ? taskName : "Start here..."}
                  rows={4}
                  cols={50}
                  className="outline-0 text-md"
                />
                <TaskButtons
                  url={url}
                  modalTaskData={modalTaskData}
                  setFinish={setFinish}
                  taskName={taskName}
                  taskTitle={taskTitle}
                  finish={finish}
                  setToastMessage={setToastMessage}
                  setShowToast={setShowToast}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskModal;
