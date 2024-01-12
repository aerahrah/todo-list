import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
import Home from "./pages/Home/home";

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`${theme}`}>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/notes" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
