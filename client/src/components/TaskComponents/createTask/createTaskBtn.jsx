import { useState } from "react";
import CreateTaskModal from "./createTaskModal";
import { FaPen } from "react-icons/fa";
import { createTask } from "../../utils/apiUtilsTask";

const CreateTask = ({
  onTaskCreated,
  finish,
  projectTitle,
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
    createTask(url, taskTitle, taskName, projectTitle, Axios)
      .then((data) => {
        console.log(projectTitle);
        console.log(data);
        setIsModalCreateOpen(false);
        setTaskName("");
        setTaskTitle("");
        onTaskCreated();
      })
      .catch((err) => {
        setToastMessage(err.message);
        setShowToast(true);
      });
  };

  return (
    <div className="fixed bottom-8 right-8">
      <button onClick={() => setIsModalCreateOpen(!isModalCreateOpen)}>
        <div className="bg-blue-300 p-4 rounded-full shadow-md shadow-gray-400">
          <FaPen size="34px" className="text-blue-950" />
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
