import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axiosInterceptor from "../components/utils/axios";
import Toast from "../components/toast";
import TaskModal from "../components/taskModal";
import { getSingleTask } from "../components/utils/apiUtils";
import CreateTask from "./createTask";

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
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const token = cookies.Token;
  const Axios = axiosInterceptor(token);

  useEffect(() => {
    handleGetAllTask();
  }, [isModalOpen, finish, updateTrigger]);

  const handleGetAllTask = async () => {
    try {
      const response = await Axios.get(`${url}/tasks`);
      const { tasks } = response.data;
      setTasksData(tasks);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTaskCreated = () => {
    setUpdateTrigger((prevTrigger) => !prevTrigger);
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
        <div className="pt-4 px-2 gap-x-4 columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4 h-auto text-gray-800">
          {tasksData.length > 0 &&
            tasksData.map((task) => (
              <ul
                className="bg-white min-w-full max-w-md p-2 rounded-xl border-[1px] shadow-sm hover:shadow mb-4 overflow-hidden max-h-60 cursor-pointer relative"
                key={task._id}
                onClick={() => handleViewSpecificTask(task._id)}
              >
                <li className="mb-2 text-lg font-semibold">{task.title}</li>
                <li className="text-md break-words overflow-y-auto max-h-40">
                  {task.name}
                </li>
                <li className="py-2">
                  {!task.completed ? "not completed" : "completed"}
                </li>
              </ul>
            ))}
        </div>
      ) : (
        <p>is loading</p>
      )}
      <TaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        url={url}
        modalTaskData={modalTaskData}
        setTaskName={setTaskName}
        setTaskTitle={setTaskTitle}
        setModalTaskData={setModalTaskData}
        setFinish={setFinish}
        taskName={taskName}
        taskTitle={taskTitle}
        finish={finish}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
      ></TaskModal>

      <CreateTask
        url={url}
        modalTaskData={modalTaskData}
        setModalTaskData={setModalTaskData}
        setFinish={setFinish}
        finish={finish}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
        onTaskCreated={handleTaskCreated}
      ></CreateTask>
      {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}
    </div>
  );
};

export default GetAllTask;
