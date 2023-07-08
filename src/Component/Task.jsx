import React, { useState, useEffect } from "react";
import AuthUser from "../AuthUser";

const TASK_LIST = "/tasks";

const Task = () => {
  const { http, setToken } = AuthUser();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await http.get(TASK_LIST);
      console.log(response.data.data);
      setTasks(response.data.data); // Assuming tasks are in the 'tasks' property of the response data
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {/* Render your tasks here */}
      {tasks.map((task) => (
        <div key={task.id}>{task.attributes.name}</div>
      ))}
    </div>
  );
};

export default Task;
