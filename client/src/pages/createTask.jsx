import { useState } from "react";
import CreateTaskModal from "../components/create_taskModal";
import { FaPen } from "react-icons/fa";
import { createTask } from "../components/utils/apiUtilsTask";

const CreateTask = ({
  onTaskCreated,
  finish,
  setFinish,
  url,
  setToastMessage,
  setShowToast,
  Axios,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const handleCreateTask = () => {
    createTask(url, taskTitle, taskName, Axios)
      .then((data) => {
        console.log(data);
        onTaskCreated();
        setIsModalCreateOpen(false);
        setTaskName("");
        setTaskTitle("");
      })
      .catch((err) => {
        setToastMessage(err.message);
        setShowToast(true);
      });
  };

  return (
    <div className="fixed bottom-8 right-8">
      <button onClick={() => setIsModalCreateOpen(!isModalCreateOpen)}>
        <div className="bg-blue-600 p-4 rounded-full shadow-md shadow-gray-400">
          <FaPen size="36px" color="white" />
        </div>
      </button>
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
