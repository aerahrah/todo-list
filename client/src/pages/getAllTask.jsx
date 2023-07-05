import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axiosInterceptor from "../components/utils/axios";

import {
  deleteTask,
  updateTask,
  getSingleTask,
} from "../components/utils/apiUtils";

const GetAllTask = () => {
  const url = "http://localhost:3500/api/v1";
  const [tasksData, setTasksData] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTaskData, setModalTaskData] = useState([]);
  const [finish, setFinish] = useState("");
  const [cookies] = useCookies(["user"]);
  const token = cookies.Token;
  const Axios = axiosInterceptor(token);
  console.log(token);

  useEffect(() => {
    handleGetAllTask();
  }, [isModalOpen, finish]);

  const handleGetAllTask = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(`${url}/tasks`);
      const { tasks } = response.data;
      setTasksData(tasks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSingleTask = (id) => {
    getSingleTask(url, id)
      .then((data) => {
        const { task } = data;
        setTaskName(task.name);
        console.log(task.name);
        setModalTaskData(task);
        setFinish(task.completed);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTask = (id) => {
    deleteTask(url, id)
      .then((data) => {
        console.log(data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTask = (id) => {
    console.log(taskName);
    console.log(finish);
    updateTask(url, id, taskName, finish)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleViewSpecificTask = (id) => {
    handleSingleTask(id);
    setIsModalOpen(true);
  };

  return (
    <div>
      {!isLoading ? (
        <div className="pt-4 px-2 gap-x-4 columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4 h-auto ">
          {tasksData.length > 0 &&
            tasksData.map((task) => (
              <ul
                className="bg-gray-100 min-w-full max-w-md p-4 rounded-xl shadow-sm hover:shadow border-2 mb-4 overflow-hidden max-h-60 cursor-pointer"
                key={task._id}
                onClick={() => handleViewSpecificTask(task._id)}
              >
                <li>{task.title}</li>
                <li>{task.name}</li>
                <li>{!task.completed ? "not completed" : "completed"}</li>
              </ul>
            ))}
        </div>
      ) : (
        <p>is loading</p>
      )}

      <div>
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm duration-500 ${
            isModalOpen ? "opacity-100 visble" : "opacity-0 invisible"
          }`}
        ></div>
        <div
          className={`${
            isModalOpen
              ? "opacity-100 scale-100 visble"
              : "opacity-0 scale-0 invisible"
          } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 transition-all duration-700`}
        >
          <h3>{modalTaskData.name}</h3>
          <p>
            <textarea
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder={taskName}
              rows={4}
              cols={50}
            />
          </p>
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
      </div>
    </div>
  );
};

export default GetAllTask;
