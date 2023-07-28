import SideBarContent from "./sideBarContent";

const SideBar = ({
  setProjectTitle,
  handleTaskCreated,
  setToastMessage,
  setShowToast,
  setTaskType,
}) => {
  return (
    <SideBarContent
      setProjectTitle={setProjectTitle}
      handleTaskCreated={handleTaskCreated}
      setToastMessage={setToastMessage}
      setShowToast={setShowToast}
      setTaskType={setTaskType}
      isMobileView={false}
    />
  );
};

export default SideBar;
