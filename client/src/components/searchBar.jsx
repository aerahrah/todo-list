import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
const SearchBar = ({ handleGetAllTask, setFilteredTask }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredTask(e.target.value);
  };
  useEffect(() => {
    handleGetAllTask();
  }, [searchTerm]);

  return (
    <div className="p-0 px-6 m-0 shadow-md flex items-center">
      <FaSearch className="text-gray-600"></FaSearch>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search anything"
        className="outline-0 w-full p-4 text-lg"
      />
    </div>
  );
};
export default SearchBar;
