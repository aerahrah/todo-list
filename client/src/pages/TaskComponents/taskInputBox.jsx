import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const TaskInputBox = ({ children, singleTaskData, handleSubmitFunction }) => {
  const schema = yup.object().shape({
    title: yup.string().required("title is required"),
    content: yup.string(),
  });

  console.log(singleTaskData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: singleTaskData?.title ?? "",
      content: singleTaskData?.name ?? "",
    },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((formData) =>
          handleSubmitFunction(singleTaskData._id, formData)
        )}
        className="flex flex-col text-gray-800"
      >
        <input
          type="text"
          placeholder={singleTaskData?.title ? singleTaskData.title : "title"}
          {...register("title")}
          className="outline-0 mb-4 text-xl font-semibold text-center capitalize"
        />
        <textarea
          placeholder={
            singleTaskData?.name ? singleTaskData.name : "Start here..."
          }
          {...register("content")}
          rows={10}
          cols={60}
          className="outline-0 text-md mx-2 mb-6"
        />
        {children}

      </form>
    </>
  );
};
export default TaskInputBox;
