import SideBarContent from "./sideBarContent";

const SideBar = ({ setProjectTitle, handleTaskCreated,setToastMessage,setShowToast }) => {
  return (
    <SideBarContent
      setProjectTitle={setProjectTitle}
      handleTaskCreated={handleTaskCreated}
      setToastMessage={setToastMessage}
      setShowToast={setShowToast}
      isMobileView={false}
    />
  );
};

export default SideBar;
