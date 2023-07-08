import React, { useState, useEffect } from "react";
import http from "../http";

const TASK_LIST = "/tasks";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await http.get(TASK_LIST);
      console.log(response);
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {/* Render your tasks here */}
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};

export default Task;
