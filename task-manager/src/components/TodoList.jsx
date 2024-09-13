import React, { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus, deleteTask } from '../services/service';
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

  const groupedTasks = tasks.reduce((groups, task) => {
    const date = new Date(task.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {});

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>
      <CreateTodo />

      <div className="mt-4">
        {Object.keys(groupedTasks).map((date) => (
          <div key={date} className="mb-4">
            <h4>{date}</h4>
            <ul className="list-group">
              {groupedTasks[date].map((task) => (
                <li key={task.id}  className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-success text-white' : ''}`}>
                  <div>
                    <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskComplete(task.id, task.completed)}
                    className="form-check-input me-2"
                  />
                    <span className={task.completed ? 'text-decoration-line-through' : ''}>
                      {task.text}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
