import SideBarContent from "./sideBarContent";

const SideBar = ({ handleTaskCreated, setToastMessage, setShowToast }) => {
  return (
    <SideBarContent
      handleTaskCreated={handleTaskCreated}
      isMobileView={false}
    />
  );
};

export default SideBar;
