import { getTextColorOption, getColorOption } from "../../utils/getColorOption";
import { useSelector } from "react-redux";

const TaskModalBtn = ({ toggleModal, colorTheme, isDisbled, btnName }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="w-full flex justify-between gap-6 items-center text-gray-800 font-semibold">
      <button
        type="button"
        className={`w-full bg-neutral-500/30 rounded py-1.5 shadow hover:opacity-[90%] ${
          theme === "light" ? "text-neutral-800" : "text-neutral-300"
        }`}
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
        className={`cursor-pointer w-full rounded py-1.5 shadow hover:opacity-[90%] ${
          theme === "light"
            ? "bg-neutral-800 text-neutral-300 "
            : "bg-neutral-100 text-neutral-800"
        }`}
        style={{
          background: getTextColorOption(colorTheme),
          color: getColorOption(colorTheme),
        }}
      />
    </div>
  );
};

export default TaskModalBtn;
