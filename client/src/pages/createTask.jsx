import { useState } from "react";
import axiosInterceptor from "../components/utils/axios";
import { useCookies } from "react-cookie";

const CreateTask = () => {
  const [cookies] = useCookies(["user"]);
  const token = cookies.Token;
  const Axios = axiosInterceptor(token);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskName, setTaskName] = useState("");
  const url = "http://localhost:3500/api/v1";

  const handleCreateTask = async () => {
    const response = await Axios.post(`${url}/tasks`, {
      title: taskTitle,
      name: taskName,
    });
    const { message } = response.data;
    console.log(message);
  };
  return (
    <div>
      <input
        type="text"
        value={taskTitle}
        placeholder="Title"
        onChange={(e) => {
          setTaskTitle(e.target.value);
        }}
      />
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
