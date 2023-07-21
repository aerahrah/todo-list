import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import { Routes, Route } from "react-router-dom";
import TaskNote from "./pages/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/notes" element={<TaskNote />}></Route>
      </Routes>
    </>
  );
}

export default App;
