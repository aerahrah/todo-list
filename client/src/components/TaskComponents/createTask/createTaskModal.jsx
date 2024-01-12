import { useDispatch, useSelector } from "react-redux";
import { toggleRefetchTaskData } from "../../../store/slices/taskSlice/fetchTaskSlice";
import { createTask } from "../../../api/taskAPI";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../../store/slices/toastSlice";
import { FaPalette, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { getTextColorOption } from "../../../utils/getColorOption";
import TaskColorPalette from "../taskColorPalette";
import TaskModal from "../taskModal";
import TaskInputBox from "../taskInputBox";
import TaskModalBtn from "../taskModalBtn";

const CreateTaskModal = ({ handleToggleCreateModal }) => {
  const dispatch = useDispatch();
  const { taskType, projectId } = useSelector((state) => state.filter);
  const { createTaskModal } = useSelector((state) => state.modal);
  const { theme } = useSelector((state) => state.theme);
  const [colorTheme, setColorTheme] = useState("");
  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleToggleCloseCreateModal = async () => {
    handleToggleCreateModal();
    setTimeout(() => {
      setIsTaskComplete(false);
      setColorTheme("");
    }, 115);
  };

  const handleCreateTask = (formData) => {
    setIsCreating(true);
    dispatch(
      createTask({ projectId, formData, taskType, isTaskComplete, colorTheme })
    )
      .then((response) => {
        if (response.type === "createTask/rejected") {
         
          dispatch(setToastMessage(response.error.message));
          dispatch(toggleDisplayToast());
        } else {
          handleToggleCloseCreateModal();
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      })
      .finally(() => {
        setIsCreating(false);
        dispatch(toggleRefetchTaskData());
      });
  };

  return (
    <TaskModal
      isModalOpen={createTaskModal}
      toggleModal={handleToggleCloseCreateModal}
      modalTheme={colorTheme}
      setColorTheme={setColorTheme}
    >
      <TaskInputBox
        handleSubmitFunction={handleCreateTask}
        theme={theme}
        textColorTheme={colorTheme}
        modalType="Add"
      >
        <div className=" transform absolute top-[.75rem] right-[4%] ">
          <div
            className="flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-neutral-600/30"
            style={{
              color: getTextColorOption(colorTheme),
            }}
          >
            <Popover>
              <Popover.Button className="block">
                <FaPalette className=" h-5 w-6 hover:opacity-[90%]" />
              </Popover.Button>
              <TaskColorPalette theme={theme} setColorTheme={setColorTheme} />
            </Popover>
            <button
              type="button"
              className="hover:opacity-[90%]"
              onClick={() => setIsTaskComplete(!isTaskComplete)}
            >
              {!isTaskComplete ? (
                <FaRegCircle className=" h-6 w-6" />
              ) : (
                <FaRegCheckCircle className=" h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <TaskModalBtn
          toggleModal={handleToggleCloseCreateModal}
          colorTheme={colorTheme}
          isDisbled={isCreating}
          btnName="Add"
        />
      </TaskInputBox>
    </TaskModal>
  );
};

export default CreateTaskModal;
