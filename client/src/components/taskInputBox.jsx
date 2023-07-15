const TaskInputBox = ({ taskTitle, setTaskTitle, taskName, setTaskName }) => {
  return (
    <div className="flex flex-col text-gray-800">
      <input
        type="text"
        value={taskTitle}
        placeholder={taskTitle ? taskTitle : "title"}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="outline-0 mb-4 text-xl font-semibold text-center capitalize"
      />
      <textarea
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder={taskName ? taskName : "Start here..."}
        rows={6}
        cols={60}
        className="outline-0 text-md mx-4 mb-2"
      />
    </div>
  );
};
export default TaskInputBox;
