import { useState, useEffect } from "react";

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
    <div className="">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search anything"
      />
    </div>
  );
};
export default SearchBar;
