import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../store/slices/darkModeSlice";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";

const DarkModeBtn = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleToggleDarkMode = () => {
    dispatch(toggleTheme());
  };
  return (
    <div>
      <button
        className="p-2 bg-neutral-200 rounded-full ring ring-1 ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700/70  outline-0 hover:bg-neutral-300/80 hover:dark:bg-neutral-900/60
        "
        onClick={handleToggleDarkMode}
      >
        {theme == "light" ? (
          <BiSolidSun className="h-6 w-6" />
        ) : (
          <BiSolidMoon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default DarkModeBtn;
