import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TaskInputBox from "../taskInputBox";

const CreateTaskModal = ({
  isModalCreateOpen,
  setIsModalCreateOpen,
  taskName,
  setTaskName,
  taskTitle,
  setTaskTitle,
  handleCreateTask,
  finish,
  setFinish,
  url,
  modalTaskData,
  setToastMessage,
  setShowToast,
}) => {
  return (
    <Transition appear show={isModalCreateOpen} as={Fragment}>
      <Dialog as="div" onClose={() => setIsModalCreateOpen(false)}>
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
                <TaskInputBox
                  taskTitle={taskTitle}
                  setTaskTitle={setTaskTitle}
                  taskName={taskName}
                  setTaskName={setTaskName}
                />
                <button
                  className="hover:text-sky-700 transform hover:scale-[1.02] "
                  onClick={handleCreateTask}
                >
                  Create
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateTaskModal;
