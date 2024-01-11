import { deleteTask, updateTask } from "../../../api/taskAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleRefetchTaskData,
  setSingleTaskDataIsComplete,
} from "../../../store/slices/taskSlice/fetchTaskSlice";
import { toggleUpdateTaskModal } from "../../../store/slices/modalSlice";
import { debounce } from "lodash";
import {
  setToastMessage,
  toggleDisplayToast,
} from "../../../store/slices/toastSlice";
import {
  FaTrash,
  FaRegCheckCircle,
  FaRegCircle,
  FaPalette,
} from "react-icons/fa";
import { Popover } from "@headlessui/react";
import { getTextColorOption } from "../../../utils/getColorOption";
import TaskModalBtn from "../taskModalBtn";
import TaskColorPalette from "../taskColorPalette";
import TaskModal from "../../../components/taskModal";
import TaskInputBox from "../taskInputBox";
import React from "react";

const UpdateTaskModal = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { singleTaskData, singleTaskDataIsComplete } = useSelector(
    (state) => state.fetch
  );
  const { updateTaskModal } = useSelector((state) => state.modal);
  const [colorTheme, setColorTheme] = useState(singleTaskData.color);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setColorTheme(singleTaskData.color);
  }, [singleTaskData.color]);

  const handleToggleUpdateModal = () => {
    dispatch(toggleUpdateTaskModal());
  };

  const handleDeleteTask = (id) => {
    setIsUpdating(true);
    dispatch(deleteTask(id))
      .then(() => {
        handleToggleUpdateModal();
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      })
      .finally(() => {
        setIsUpdating(false);
        dispatch(toggleRefetchTaskData());
      });
  };

  const handleUpdateTask = debounce((id, formData) => {
    setIsUpdating(true);
    dispatch(updateTask({ id, formData, singleTaskDataIsComplete, colorTheme }))
      .then(() => {
        handleToggleUpdateModal();
      })
      .catch((err) => {
        dispatch(setToastMessage(err.message));
        dispatch(toggleDisplayToast());
      })
      .finally(() => {
        setIsUpdating(false);
        dispatch(toggleRefetchTaskData());
      });
  }, 100);

  return (
    <TaskModal
      isModalOpen={updateTaskModal}
      toggleModal={handleToggleUpdateModal}
      modalTheme={colorTheme}
    >
      <TaskInputBox
        singleTaskData={singleTaskData}
        textColorTheme={colorTheme}
        handleSubmitFunction={handleUpdateTask}
        modalType="Update"
        theme={theme}
      >
        <div className=" transform absolute top-[.75rem] right-[4%] ">
          <div
            className="flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-neutral-600/30"
            style={{
              color: getTextColorOption(colorTheme),
            }}
          >
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handleDeleteTask(singleTaskData._id)}
            >
              <FaTrash className=" h-5 w-4" />
            </button>
            <Popover>
              <Popover.Button className="block">
                <FaPalette className=" h-5 w-6 " />
              </Popover.Button>
              <TaskColorPalette theme={theme} setColorTheme={setColorTheme} />
            </Popover>

            <button
              type="button"
              onClick={() =>
                dispatch(setSingleTaskDataIsComplete(!singleTaskDataIsComplete))
              }
            >
              {!singleTaskDataIsComplete ? (
                <FaRegCircle className=" h-6 w-6" />
              ) : (
                <FaRegCheckCircle className=" h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <TaskModalBtn
          toggleModal={handleToggleUpdateModal}
          colorTheme={colorTheme}
          isDisbled={isUpdating}
          btnName="Update"
        />
      </TaskInputBox>
    </TaskModal>
  );
};

export default UpdateTaskModal;
