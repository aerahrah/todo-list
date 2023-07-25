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
        className=" transform transition md:flex gap-1 hover:bg-blue-950 hover:text-blue-50 border-blue-950 border-[1px]  rounded-lg p-1.5 items-center hover:cursor-pointer hover:shadow-md hover:scale-[1.03] duration-100 tracking-tight whitespace-nowrap hidden"
        onClick={handleSingOut}
      >
        <FaSignOutAlt size="1.15rem" />
        Log Out
      </div>
      <div className="p-2 md:hidden border-[1px] rounded-lg">
        <FaSignOutAlt
          className="text-blue-950"
          size="1.45rem"
          onClick={handleSingOut}
        />
      </div>
    </>
  );
};

export default Signout;
