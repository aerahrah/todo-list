import { getTextColorOption, getColorOption } from "../../utils/getColorOption";
import { useSelector } from "react-redux";

const TaskModalBtn = ({ toggleModal, colorTheme, isDisbled, btnName }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="w-full flex justify-between gap-6 items-center text-gray-800 font-semibold">
      <button
        type="button"
        className=" w-full bg-neutral-500/30 text-neutral-800 rounded py-1.5 shadow"
        onClick={() => toggleModal()}
        style={{
          color: getTextColorOption(colorTheme),
        }}
      >
        Cancel
      </button>
      <input
        type="submit"
        value={btnName}
        disabled={isDisbled}
        className="cursor-pointer w-full rounded py-1.5 text-neutral-100 shadow "
        style={{
          background: colorTheme
            ? getTextColorOption(colorTheme)
            : theme === "light"
            ? "#262626"
            : " #fafafa",
          color: colorTheme
            ? getColorOption(colorTheme)
            : theme === "light"
            ? " #fafafa"
            : "#262626",
        }}
      />
    </div>
  );
};

export default TaskModalBtn;
