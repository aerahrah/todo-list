import Axios from "axios";
import { useState } from "react";
const GetAllTask = () => {
  const url = "http://localhost:3500/api/v1";
  const [tasksData, setTasksData] = useState([]);

  const handleGetAllTask = async () => {
    const response = await Axios.get(`${url}/tasks`);
    const { tasks } = response.data;
    setTasksData(tasks);
  };
  return (
    <div>
      <button onClick={handleGetAllTask}>Get all task</button>
      {tasksData.map((task) => (
        <ul>
          <li>{task._id}</li>
          <li>{task.name}</li>
        </ul>
      ))}
    </div>
  );
};

export default GetAllTask;
