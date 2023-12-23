import AuthForm from "./authForm";
import { useDispatch } from "react-redux";
import { signup } from "../../api/authAPI";

const Signup = () => {
  const dispatch = useDispatch();

  const handleSignup = (userInfo) => {
    try {
      dispatch(signup(userInfo));
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm title="Signup" handleAuth={handleSignup} />;
};

export default Signup;
