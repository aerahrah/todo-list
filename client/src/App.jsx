import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
import { Routes, Route } from "react-router-dom";
import TaskNote from "./pages/layout";
import { useSelector } from "react-redux";
function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`${theme}`}>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/notes" element={<TaskNote />}></Route>
      </Routes>
    </div>
  );
}

export default App;
