import { useState } from "react";
import "./App.css";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </>
  );
}

export default App;
