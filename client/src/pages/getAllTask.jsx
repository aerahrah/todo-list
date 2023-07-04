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
  const [modalTaskData, setModalTaskData] = useState([]);
  const [finish, setFinish] = useState("");
  const [cookies] = useCookies(["user"]);
  const token = cookies.Token;
  const Axios = axiosInterceptor(token);
  console.log(token);
  useEffect(() => {
    if (isModalOpen) {
      handleGetAllTask();
    }
  }, [isModalOpen, finish]);

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
      <div>
        <button onClick={handleGetAllTask}>Get all task</button>
        {tasksData.length > 0 &&
          tasksData.map((task) => (
            <ul key={task._id}>
              <li>{task._id}</li>
              <li>{task.name}</li>
              <li>{!task.completed ? "not completed" : "completed"}</li>
              <li onClick={() => handleViewSpecificTask(task._id)}>edit</li>
            </ul>
          ))}
      </div>
      {isModalOpen && (
        <div>
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
      )}
    </div>
  );
};

export default GetAllTask;
