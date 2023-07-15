import { useState, useEffect } from "react";

const SortBtn = ({ setSortByTask, handleGetAllTask }) => {
  const [sortBy, setSortBy] = useState("");
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setSortByTask(e.target.value);
  };

  useEffect(() => {
    handleGetAllTask();
  }, [sortBy]);

  return (
    <div className="border-2 mr-4 outline-0 ">
      <select id="sort-select" value={sortBy} onChange={handleSortChange}>
        <option value="">-- Select --</option>
        <option value="all task">All task</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default SortBtn;
