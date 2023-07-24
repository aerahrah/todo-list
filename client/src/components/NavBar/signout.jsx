import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Signout = ({ FaSignOutAlt }) => {
  const [cookies, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const handleSingOut = () => {
    removeCookie("Token");
    navigate("/signin");
  };
  return (
    <>
      <div
        className=" transform transition md:flex gap-1 hover:bg-blue-950 hover:text-blue-50 border-blue-950 border-[1px]  rounded-lg p-1.5 items-center hover:cursor-pointer hover:shadow-md hover:scale-[1.02] duration-100 tracking-tight w-32 hidden"
        onClick={handleSingOut}
      >
        <FaSignOutAlt size="1.15rem" />
        Log Out
      </div>
      <FaSignOutAlt
        className="md:hidden text-blue-950"
        size="1.5rem"
        onClick={handleSingOut}
      />
    </>
  );
};

export default Signout;
