import { Signin, Signup } from "./components/auth/auth";
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
