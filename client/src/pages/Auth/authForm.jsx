import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

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
    <div className="flex min-h-screen bg-neutral-200 w-full items-center justify-center text-blue-950">
      <div className="flex flex-col bg-white items-center p-8 rounded-xl shadow-lg ring ring-1 ring-neutral-300">
        <h1 className="mb-14 text-6xl font-black uppercase tracking-tight drop-shadow-md shadow-blue-md">
          TaskNote
        </h1>

        <form className="flex flex-col " onSubmit={handleFormSubmit}>
          <input
            className="text-lg mb-6 border-b-2 capitalize min-w-[14rem] w-[20vw] outline-0 focus:border-blue-950"
            type="text"
            value={username}
            placeholder="username"
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="text-lg mb-10 border-b-2 capitalize min-w-[14rem] w-[20vw] outline-0 focus:border-blue-950"
            type="password"
            value={password}
            placeholder="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mb-6 bg-blue-950 min-w-[12rem] uppercase font-semibold rounded-full py-2 px-4 mx-auto text-white hover:scale-[1.01] hover:shadow-md active:scale-[.98] active:shadow-none transition duration-100 text-lg"
            type="submit"
          >
            {title}
          </button>
          <p className="mx-auto mb-4 text-md">
            {title == "Signup" ? (
              <span>
                Already have an account?{" "}
                <Link className="text-blue-500 hover:underline" to="/signin">
                  Sign in
                </Link>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <Link className="text-blue-500 hover:underline" to="/">
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
      <Footer />
    </div>
  );
};

export default AuthForm;
