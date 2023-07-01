import { useState } from "react";
import Axios from "axios";

const CreateTask = () => {
  const [taskName, setTaskName] = useState("");
  const url = "http://localhost:3500/api/v1";

  const handleCreateTask = async () => {
    const response = await Axios.post(`${url}/tasks`, { name: taskName });
    const { message } = response.data;
    console.log(message);
  };
  return (
    <div>
      <input
        type="text"
        value={taskName}
        placeholder="Name of the task"
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
      <button onClick={handleCreateTask}>submit</button>
    </div>
  );
};

export default CreateTask;
