import React, { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus } from '../services/service'; 
import CreateTodo from './CreateTodo';

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks((tasksList) => {
      setTasks(tasksList);
    });
  }, []);

  const handleTaskComplete = (taskId, completed) => {
    updateTaskStatus(taskId, !completed); 
  };

  return (
    <div className="container">
      <h1 className="text-center">Todo List</h1>
      <CreateTodo />
      <ul className="list-group mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className={task.completed ? 'text-decoration-line-through' : ''} style={{ marginLeft: '10px' }}>
                {task.text} (Created: {new Date(task.createdAt).toLocaleDateString()})
                <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskComplete(task.id, task.completed)}
              />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
