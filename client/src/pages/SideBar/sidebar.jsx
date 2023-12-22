import SideBarContent from "./sideBarContent";

const SideBar = ({
  setProjectTitle,
  handleTaskCreated,
  setToastMessage,
  setShowToast,
  setTaskType,
  taskType,
}) => {
  return (
    <SideBarContent
      setProjectTitle={setProjectTitle}
      handleTaskCreated={handleTaskCreated}
      setToastMessage={setToastMessage}
      setShowToast={setShowToast}
      setTaskType={setTaskType}
      taskType={taskType}
      isMobileView={false}
    />
  );
};

export default SideBar;
