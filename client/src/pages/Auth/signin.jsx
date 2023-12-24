import AuthForm from "./authForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../api/authAPI";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = async (userInfo) => {
    try {
      const data = await dispatch(signin(userInfo));
      console.log(data.type);
      if (data.type === "auth/signin/fulfilled") {
        navigate("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm title="Signin" handleAuth={handleSignin} />;
};

export default Signin;
