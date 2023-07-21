import React, { useState, useEffect } from "react";
import TaskCard from "./taskCard";

const TaskList = ({ tasksData, handleViewSpecificTask }) => {
  return (
    <div className="py-4 px-6">
      {tasksData.some((task) => task.completed) && (
        <div>
          <h2 className="mb-4 px-1 uppercase font-semibold text-sm text-gray-500">
            Completed tasks
          </h2>
          <div className="columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4  h-auto mb-8">
            {tasksData
              .filter((task) => task.completed)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  handleViewSpecificTask={handleViewSpecificTask}
                />
              ))}
          </div>
        </div>
      )}
      {tasksData.some((task) => !task.completed) && (
        <div>
          <h2 className="mb-4 px-1 uppercase font-semibold text-sm text-gray-500">
            Not completed tasks
          </h2>
          <div className="columns-2 sm:columns-3 md:columns-2 lg:columns-3 xl:columns-4  h-auto">
            {tasksData
              .filter((task) => !task.completed)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  handleViewSpecificTask={handleViewSpecificTask}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
