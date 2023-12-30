import { useNavigate } from "react-router-dom";

const Signout = ({ FaSignOutAlt }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div
        className=" transform transition md:flex gap-1 hover:bg-blue-950 hover:text-blue-50 border-blue-950  border-[1px]  rounded-full p-2 items-center hover:cursor-pointer hover:shadow-md hover:scale-[1.03] duration-100 tracking-tight whitespace-nowrap hidden"
        onClick={handleLogout}
      >
        <FaSignOutAlt size="1.15rem" />
        Log Out
      </div>
      <div className="p-2 md:hidden border-[1px] rounded-lg">
        <FaSignOutAlt
          className="text-blue-950"
          size="1.45rem"
          onClick={handleLogout}
        />
      </div>
    </>
  );
};

export default Signout;
