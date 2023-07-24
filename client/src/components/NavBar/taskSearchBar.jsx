const TaskSearchBar = ({
  handleTaskCreated,
  setFilteredTask,
  FaSearch,
  useState,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredTask(e.target.value);
    handleTaskCreated();
  };

  return (
    <div className="flex items-center w-full">
      <FaSearch className="text-gray-600"></FaSearch>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
        className="outline-0 w-full p-4 px-2 text-lg"
      />
    </div>
  );
};

export default TaskSearchBar;
