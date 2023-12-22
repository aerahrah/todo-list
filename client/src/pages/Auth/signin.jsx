import AuthForm from "./authForm";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const url = "http://localhost:3500/api/v1";
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSignin = async (userInfo) => {
    try {
      console.log("Signing in...");
      const response = await Axios.post(`${url}/auth/signin`, {
        username: userInfo.username,
        password: userInfo.password,
      });
      const { message, token } = response.data;
      setCookie("Token", token, { path: "/" });
      navigate("/notes");
      setMessage(message);
    } catch (error) {
      setMessage(error.response.data.message);
      setError(true);
    }
  };

  return (
    <AuthForm
      title="Signin"
      handleAuth={handleSignin}
      message={message}
      setMessage={setMessage}
      error={error}
      setError={setError}
    />
  );
};

export default Signin;
