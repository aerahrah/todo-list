import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/slices/darkModeSlice";
const DarkModeBtn = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleToggleDarkMode = () => {
    dispatch(toggleTheme());
  };
  return (
    <div>
      <button onClick={handleToggleDarkMode}>{theme}</button>
    </div>
  );
};

export default DarkModeBtn;
