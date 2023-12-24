import SideBarContent from "./sideBarContent";

const SideBar = ({ handleTaskCreated, setToastMessage, setShowToast }) => {
  return (
    <SideBarContent
      handleTaskCreated={handleTaskCreated}
      setToastMessage={setToastMessage}
      setShowToast={setShowToast}
      isMobileView={false}
    />
  );
};

export default SideBar;
