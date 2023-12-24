import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createTask } from "../../../api/taskAPI";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../../store/slices/toastSlice";
import TaskInputBox from "../taskInputBox";

const CreateTaskModal = ({
  isModalCreateOpen,
  setIsModalCreateOpen,
  onTaskCreated,
}) => {
  const dispatch = useDispatch();
  const { taskType, projectId } = useSelector((state) => state.filter);
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const handleCreateTask = () => {
    createTask(taskTitle, taskName, projectId, taskType)
      .then(() => {
        setIsModalCreateOpen(false);
        setTaskName("");
        setTaskTitle("");
        onTaskCreated();
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      });
  };

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
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" />
        </Transition.Child>
        <div className="fixed inset-0 z-50">
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
                <div className="flex justify-between px-6">
                  <button
                    className="hover:text-red-500 transform hover:scale-[1.02] "
                    onClick={() => setIsModalCreateOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="hover:text-blue-500 transform hover:scale-[1.02] "
                    onClick={handleCreateTask}
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateTaskModal;
