import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import { Routes, Route } from "react-router-dom";
import GetAllTask from "./pages/loadTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/notes" element={<GetAllTask />}></Route>
      </Routes>
    </>
  );
}

export default App;
