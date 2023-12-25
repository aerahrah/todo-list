import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import TaskControl from "./taskControl";
import * as yup from "yup";

const TaskInputBox = ({
  isModalOpen,
  handleTaskCreated,
  setIsModalOpen,
  finish,
  setFinish,
  url,
  modalTaskData,
  setModalTaskData,
  Axios,
}) => {
  const { singleTaskDataStatic } = useSelector((state) => state.fetch);
  const schema = yup.object().shape({
    title: yup.string().required("title is required"),
    content: yup.string(),
  });

  console.log(singleTaskDataStatic);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: singleTaskDataStatic.title,
      content: singleTaskDataStatic.content,
    },
  });

  return (
    <>
      <div className="flex flex-col text-gray-800">
        <input
          type="text"
          placeholder={
            singleTaskDataStatic.title ? singleTaskDataStatic.title : "title"
          }
          {...register("title")}
          className="outline-0 mb-4 text-xl font-semibold text-center capitalize"
        />
        <textarea
          placeholder={
            singleTaskDataStatic.content
              ? singleTaskDataStatic.content
              : "Start here..."
          }
          {...register("content")}
          rows={6}
          cols={60}
          className="outline-0 text-md mx-4 mb-2"
        />
      </div>
      <TaskControl
        url={url}
        modalTaskData={modalTaskData}
        setModalTaskData={setModalTaskData}
        setFinish={setFinish}
        handleTaskCreated={handleTaskCreated}
        finish={finish}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        Axios={Axios}
      />
    </>
  );
};
export default TaskInputBox;
