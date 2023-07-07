import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axiosInterceptor from "../components/utils/axios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Toast from "../components/toast";

import {
  deleteTask,
  updateTask,
  getSingleTask,
} from "../components/utils/apiUtils";

const GetAllTask = () => {
  const url = "http://localhost:3500/api/v1";
  const [tasksData, setTasksData] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTaskData, setModalTaskData] = useState([]);
  const [finish, setFinish] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [cookies] = useCookies(["user"]);
  const token = cookies.Token;
  const Axios = axiosInterceptor(token);
  console.log(token);

  useEffect(() => {
    handleGetAllTask();
  }, [isModalOpen, finish]);

  useEffect(() => {
    console.log(modalTaskData._id);
    if (!isModalOpen && modalTaskData._id !== undefined) {
      handleUpdateTask(modalTaskData._id);
    }
  }, [modalTaskData, isModalOpen]);

  const handleGetAllTask = async () => {
    try {
      const response = await Axios.get(`${url}/tasks`);
      const { tasks } = response.data;
      setTasksData(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSingleTask = (id) => {
    getSingleTask(url, id)
      .then((data) => {
        const { task } = data;
        setTaskName(task.name);
        setTaskTitle(task.title);
        setModalTaskData(task);
        setFinish(task.completed);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTask = (id) => {
    deleteTask(url, id)
      .then((data) => {
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTask = (id) => {
    updateTask(url, id, taskName, taskTitle, finish)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setToastMessage(err.message);
        setShowToast(true);
        <Toast message={err} />;
      });
  };

  const handleViewSpecificTask = (id) => {
    handleSingleTask(id);
    setIsModalOpen(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  return (
    <div>
      {!isLoading ? (
        <div className="pt-4 px-2 gap-x-4 columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4 h-auto ">
          {tasksData.length > 0 &&
            tasksData.map((task) => (
              <ul
                className="bg-white min-w-full max-w-md p-4 rounded-xl border-[1px] shadow-sm hover:shadow mb-4 overflow-hidden max-h-60 cursor-pointer"
                key={task._id}
                onClick={() => handleViewSpecificTask(task._id)}
              >
                <li className="outline-0 mb-2 text-lg font-semibold">
                  {task.title}
                </li>
                <li className="outline-0 text-md">{task.name}</li>
                <li>{!task.completed ? "not completed" : "completed"}</li>
              </ul>
            ))}
        </div>
      ) : (
        <p>is loading</p>
      )}
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
                  <div>
                    <button onClick={() => setFinish(!finish)}>
                      {!finish ? "not completed" : "completed"}
                    </button>
                    <button onClick={() => handleUpdateTask(modalTaskData._id)}>
                      update
                    </button>
                    <button onClick={() => handleDeleteTask(modalTaskData._id)}>
                      delete
                    </button>
                    <button onClick={() => setIsModalOpen(false)}>close</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}
    </div>
  );
};

export default GetAllTask;
