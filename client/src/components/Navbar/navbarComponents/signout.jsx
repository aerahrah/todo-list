import { useNavigate } from "react-router-dom";

const Signout = ({ FaSignOutAlt }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <button className="p-2 hover:bg-neutral-300/80 hover:dark:bg-neutral-900/60 bg-neutral-200 ring ring-1   ring-neutral-300 rounded-full dark:ring-neutral-700 dark:bg-neutral-900">
        <FaSignOutAlt size="1.45rem" onClick={handleLogout} />
      </button>
    </>
  );
};

export default Signout;
