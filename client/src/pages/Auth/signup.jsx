import AuthForm from "./authForm";
import Axios from "axios";
import { useState } from "react";

const Signup = () => {
  const url = "http://localhost:3500/api/v1";

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSignup = async (userInfo) => {
    try {
      const response = await Axios.post(`${url}/auth/signup`, {
        username: userInfo.username,
        password: userInfo.password,
      });
      const { message } = response.data;
      setMessage(message);
    } catch (error) {
      setMessage(error.response.data.message);
      setError(true);
    }
  };

  return (
    <AuthForm
      title="Signup"
      handleAuth={handleSignup}
      message={message}
      setMessage={setMessage}
      error={error}
      setError={setError}
    />
  );
};

export default Signup;
