import { useState } from "react";
import Axios from "axios";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:3500/api/v1";

  const handleSignup = async () => {
    try {
      console.log("click");
      const response = await Axios.post(`${url}/auth/signup`, {
        username: username,
        password: password,
      });
      const { message } = response.data;
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
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
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
