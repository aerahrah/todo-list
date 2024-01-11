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
import TaskModal from "../../../components/taskModal";
import TaskInputBox from "../taskInputBox";
import TaskModalBtn from "../taskModalBtn";

const CreateTaskModal = ({ handleToggleCreateModal }) => {
  const dispatch = useDispatch();
  const { taskType, projectId } = useSelector((state) => state.filter);
  const { createTaskModal } = useSelector((state) => state.modal);
  const { theme } = useSelector((state) => state.theme);
  const [colorTheme, setColorTheme] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isTaskComplete, setIsTaskComplete] = useState(false);

  const handleCreateTask = (formData) => {
    setIsCreating(true);
    dispatch(
      createTask({ projectId, formData, taskType, isTaskComplete, colorTheme })
    )
      .then(() => {
        handleToggleCreateModal();
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      })
      .finally(() => {
        setIsCreating(false);
        dispatch(toggleRefetchTaskData());
        setIsTaskComplete(false);
        setColorTheme("");
      });
  };

  return (
    <TaskModal
      isModalOpen={createTaskModal}
      toggleModal={handleToggleCreateModal}
      modalTheme={colorTheme}
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
                <FaPalette className=" h-5 w-6 " />
              </Popover.Button>
              <TaskColorPalette theme={theme} setColorTheme={setColorTheme} />
            </Popover>
            <button
              type="button"
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
          toggleModal={handleToggleCreateModal}
          colorTheme={colorTheme}
          isDisbled={isCreating}
          btnName="Add"
        />
      </TaskInputBox>
    </TaskModal>
  );
};

export default CreateTaskModal;
