import AuthForm from "./authForm";
import Axios from "axios";
import { useState } from "react";

const Signup = () => {
  const url = "http://localhost:3500/api/v1";

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSignup = async (username, password) => {
    try {
      const response = await Axios.post(`${url}/auth/signup`, {
        username,
        password,
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
      handleSubmit={handleSignup}
      message={message}
      setMessage={setMessage}
      error={error}
      setError={setError}
    />
  );
};

export default Signup;
