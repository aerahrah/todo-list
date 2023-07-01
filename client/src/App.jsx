import { useState } from "react";
import "./App.css";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import { Routes, Route } from "react-router-dom";
import GetAllTask from "./pages/getAllTask";
import CreateTask from "./pages/createTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/all-task" element={<GetAllTask />}></Route>
        <Route path="/create-task" element={<CreateTask />}></Route>
      </Routes>
    </>
  );
}

export default App;
