import { useState } from "react";
import axiosInterceptor from "../components/utils/axios";
import { useCookies } from "react-cookie";
import CreateTaskModal from "../components/create_taskModal";

const CreateTask = ({
  onTaskCreated,
  finish,
  setFinish,
  url,
  setToastMessage,
  setShowToast,
}) => {
  const [cookies] = useCookies(["user"]);
  const token = cookies.Token;
  const Axios = axiosInterceptor(token);
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const handleCreateTask = async () => {
    const response = await Axios.post(`${url}/tasks`, {
      title: taskTitle,
      name: taskName,
    });
    const { message } = response.data;
    console.log(message);
    onTaskCreated();
  };
  return (
    <div className="absolute bottom-8 right-8">
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
      <CreateTaskModal
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        url={url}
        setTaskName={setTaskName}
        setTaskTitle={setTaskTitle}
        setFinish={setFinish}
        taskName={taskName}
        taskTitle={taskTitle}
        finish={finish}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
        handleCreateTask={handleCreateTask}
      ></CreateTaskModal>
    </div>
  );
};

export default CreateTask;
