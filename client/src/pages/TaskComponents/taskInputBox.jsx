import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const TaskInputBox = ({
  children,
  singleTaskData,
  handleSubmitFunction,
  modalType,
  theme,
}) => {
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
        onSubmit={handleSubmit((formData) => {
          modalType == "Update"
            ? handleSubmitFunction(singleTaskData._id, formData)
            : handleSubmitFunction(formData);
        })}
        className={`flex flex-col mx-2 ${
          theme === "light" ? "text-neutral-800" : "text-neutral-300"
        }`}
      >
        <input
          type="text"
          placeholder={singleTaskData?.title ? singleTaskData.title : "title"}
          {...register("title")}
          className={`outline-0 mb-6 text-xl font-semibold  capitalize w-[60%]  ${
            theme === "light" ? "bg-white" : "bg-neutral-800"
          }`}
        />
        <textarea
          placeholder={
            singleTaskData?.name ? singleTaskData.name : "Start here..."
          }
          {...register("content")}
          rows={10}
          cols={60}
          className={`outline-0 text-base px-1 mb-6 ${
            theme === "light" ? "bg-white" : "bg-neutral-800"
          }`}
        />
        {children}
      </form>
    </>
  );
};
export default TaskInputBox;
