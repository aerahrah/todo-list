import SideBarContent from "./sideBarContent";

const SideBar = ({ setProjectTitle, handleTaskCreated }) => {
  return (
    <SideBarContent
      setProjectTitle={setProjectTitle}
      handleTaskCreated={handleTaskCreated}
      isMobileView={false}
    />
  );
};

export default SideBar;
