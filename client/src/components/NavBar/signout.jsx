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
        className="md:flex gap-1 ring ring-1 ring-neutral-300 text-neutral-800 bg-neutral-200 hover:bg-neutral-400/40  rounded-full p-2 items-center hover:cursor-pointer tracking-tight whitespace-nowrap hidden dark:bg-neutral-900 dark:ring-neutral-700/70 dark:text-neutral-300"
        onClick={handleLogout}
      >
        <FaSignOutAlt size="1.15rem" />
        Log Out
      </div>
      <div className="p-2 md:hidden border-[1px] rounded-lg">
        <FaSignOutAlt
          className="text-neutral-800"
          size="1.45rem"
          onClick={handleLogout}
        />
      </div>
    </>
  );
};

export default Signout;
