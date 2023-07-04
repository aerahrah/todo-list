import { useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ title, handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(username, password);
  };

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{title}</button>
      </form>
    </div>
  );
};

export const Signin = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const url = "http://localhost:3500/api/v1";
  const navigate = useNavigate();
  const handleSignin = async (username, password) => {
    try {
      console.log("Signing in...");
      const response = await Axios.post(`${url}/auth/signin`, {
        username,
        password,
      });
      const { message, token } = response.data;
      setCookie("Token", token, { path: "/" });
      navigate("/all-task");
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm title="Signin" handleSubmit={handleSignin} />;
};

export const Signup = () => {
  const url = "http://localhost:3500/api/v1";

  const handleSignup = async (username, password) => {
    try {
      console.log("Signing up...");
      const response = await Axios.post(`${url}/auth/signup`, {
        username,
        password,
      });
      const { message } = response.data;
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm title="Signup" handleSubmit={handleSignup} />;
};
