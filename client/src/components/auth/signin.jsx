import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useCookies } from "react-cookie";

const Signin = () => {
  const [setCookie] = useCookies(["user"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:3500/api/v1";
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      console.log("Signing in...");
      const response = await Axios.post(`${url}/auth/signin`, {
        username: username,
        password: password,
      });
      const { message, token } = response.data;
      console.log(token);
      setCookie("Token", token, { path: "/" });
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1> Signin</h1>
      <input
        type="text"
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignin}>signin</button>
    </div>
  );
};

export default Signin;
