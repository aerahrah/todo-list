import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, clearAuthMessage } from "../../store/slices/authSlice";
import Footer from "../../components/Footer/Footer";
import * as yup from "yup";

const AuthForm = ({ title, handleAuth }) => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (
      message === "User registered successfully" ||
      message === "Successfully signed in"
    ) {
      const timer = setTimeout(() => {
        dispatch(clearAuthMessage());
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
    if (message !== "") {
      const timer = setTimeout(() => {
        dispatch(clearAuthError());
        dispatch(clearAuthMessage());
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <div className="flex min-h-screen bg-neutral-200 dark:bg-neutral-900  w-full items-center justify-center text-blue-950 dark:text-neutral-300">
      <div className="flex flex-col bg-white dark:bg-neutral-800 items-center p-8 rounded-xl shadow-lg ring ring-1 ring-neutral-300 dark:ring-neutral-700/60">
        <h1 className="mb-14 text-6xl font-black uppercase tracking-tight drop-shadow-md shadow-blue-md">
          TaskNote
        </h1>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(handleAuth)}
        >
          <div className="flex flex-col gap-8 relative">
            <div className="w-full relative text-lg ">
              <input
                className={`text-lg border-b-2 min-w-[14rem] w-full outline-0 bg-white dark:bg-neutral-800 ${
                  errors.username
                    ? "border-red-500"
                    : "border-neutral-300 dark:border-neutral-700 focus:border-blue-950"
                }`}
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              <p className="absolute text-xs text-red-500">
                {errors.username?.message}
              </p>
            </div>

            <div className="w-full relative text-lg mb-14">
              <input
                className={`text-lg border-b-2 capitalize min-w-[14rem] w-full outline-0 bg-white dark:bg-neutral-800 ${
                  errors.password
                    ? "border-red-500"
                    : "border-neutral-300 dark:border-neutral-700 focus:border-blue-950"
                }`}
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className="absolute text-xs text-red-500">
                {errors.password?.message}
              </p>
            </div>
            {message && (
              <div
                className={`absolute bottom-[1rem] w-full text-center transition duration-200 ${
                  message ? "scale-100" : "scale-0"
                } ${error ? "text-red-500" : "text-green-500"}`}
              >
                {message && <p>{message}</p>}
              </div>
            )}
          </div>
          <input
            className="mb-6 cursor-pointer bg-blue-950 dark:bg-neutral-300  text-neutral-300 dark:text-neutral-700 min-w-[12rem] uppercase font-semibold rounded-full py-2 px-4 mx-auto  hover:scale-[1.01] hover:shadow-md active:scale-[.98] active:shadow-none transition duration-100 text-lg"
            type="submit"
            value={title}
          />

          <p className="mx-auto text-md">
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
      </div>
      <Footer />
    </div>
  );
};

export default AuthForm;
