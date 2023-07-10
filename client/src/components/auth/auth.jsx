import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthForm = ({
  title,
  handleSubmit,
  message,
  setMessage,
  error,
  setError,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setError(true);
      setMessage("Please enter a username");
      return;
    }

    if (password.trim() === "") {
      setError(true);
      setMessage("Please enter a password");
      return;
    }
    handleSubmit(username, password);
  };

  useEffect(() => {
    if (message === "User registered successfully") {
      const timer = setTimeout(() => {
        setMessage("");
        navigate("/signin");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
    if (message !== "") {
      const timer = setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-gray-800">
      <div className="flex flex-col bg-white items-center p-8 rounded-xl shadow-md">
        <h1 className="mb-10 text-6xl font-black uppercase tracking-tight text-blue-500 drop-shadow-md shadow-blue-md">
          TaskNote
        </h1>
        <h1 className="mb-8 text-3xl font-bold uppercase ">{title}</h1>
        <form className="flex flex-col " onSubmit={handleFormSubmit}>
          <input
            className="mb-6 border-b-2 capitalize min-w-[14rem] w-[20vw] outline-0 focus:border-blue-500"
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mb-8 border-b-2 capitalize min-w-[14rem] w-[20vw] outline-0 focus:border-blue-500"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mb-6 bg-blue-500 min-w-[12rem] uppercase font-semibold rounded-full py-2 px-4 mx-auto text-sky-100 hover:scale-[1.01] hover:shadow-md active:scale-[.98] active:shadow-none transition duration-100"
            type="submit"
          >
            {title}
          </button>
          <p className="mx-auto mb-4">
            {title == "Signup" ? (
              <span>
                Already have an account?{" "}
                <Link className="text-blue-500" to="/signin">
                  Sign in
                </Link>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <Link className="text-blue-500" to="/">
                  Sign up
                </Link>
              </span>
            )}
          </p>
        </form>
        <div
          className={`text-center transition duration-200 ${
            message ? "scale-100" : "scale-0"
          } ${error ? "text-red-500" : "text-green-500"}`}
        >
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export const Signin = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const url = "http://localhost:3500/api/v1";
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSignin = async (username, password) => {
    try {
      console.log("Signing in...");
      const response = await Axios.post(`${url}/auth/signin`, {
        username,
        password,
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
      handleSubmit={handleSignin}
      message={message}
      setMessage={setMessage}
      error={error}
      setError={setError}
    />
  );
};

export const Signup = () => {
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
