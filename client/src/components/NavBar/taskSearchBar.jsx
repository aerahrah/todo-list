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
    <div className="relative flex items-center w-full py-3 mr-4 md:mr-6 ">
      <FaSearch className="text-gray-600 absolute left-[.5rem]"></FaSearch>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
        className="outline-0 w-full p-1.5 pl-8 px-2 text-lg rounded-full bg-blue-50 shadow-inner"
      />
    </div>
  );
};

export default TaskSearchBar;
