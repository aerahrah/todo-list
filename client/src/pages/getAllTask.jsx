import Axios from "axios";
import { useState } from "react";
import {
  deleteTask,
  updateTask,
  getSingleTask,
} from "../components/utils/apiUtils";

const GetAllTask = () => {
  const url = "http://localhost:3500/api/v1";
  const [tasksData, setTasksData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTaskData, setModalTaskData] = useState([]);

  const handleGetAllTask = async () => {
    const response = await Axios.get(`${url}/tasks`);
    const { tasks } = response.data;
    setTasksData(tasks);
  };
  const handleSingleTask = (id) => {
    getSingleTask(url, id)
      .then((data) => {
        const { task } = data;
        setModalTaskData(task);
        console.log(task);
      })
      .catch((err) => console.error(err));
  };
  const handleEditClick = (id) => {
    handleSingleTask(id);
    setIsModalOpen(true);
  };
  return (
    <div>
      <div>
        <button onClick={handleGetAllTask}>Get all task</button>
        {tasksData.map((task) => (
          <ul key={task._id}>
            <li>{task._id}</li>
            <li>{task.name}</li>
            <li onClick={() => handleEditClick(task._id)}>edit</li>
          </ul>
        ))}
      </div>
      {isModalOpen && (
        <div>
          <h3>{modalTaskData.name}</h3>
          <p>{modalTaskData._id}</p>
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </div>
      )}
    </div>
  );
};

export default GetAllTask;
