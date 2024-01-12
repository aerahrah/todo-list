import { useNavigate } from "react-router-dom";

const Signout = ({ FaSignOutAlt }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <button
        className="md:flex gap-1 ring ring-1 ring-neutral-300 bg-neutral-200 hover:bg-neutral-300/80 hover:dark:bg-neutral-900/60 rounded-full p-1.5 items-center tracking-tight whitespace-nowrap hidden dark:bg-neutral-900 dark:ring-neutral-700/70 "
        onClick={handleLogout}
      >
        <FaSignOutAlt size="1.15rem" />
        Log Out
      </button>
      <button className="p-2 md:hidden  bg-neutral-200 ring ring-1   ring-neutral-300 rounded-full dark:ring-neutral-700 dark:bg-neutral-900">
        <FaSignOutAlt size="1.45rem" onClick={handleLogout} />
      </button>
    </>
  );
};

export default Signout;
