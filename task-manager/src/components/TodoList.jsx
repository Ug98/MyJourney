import React, { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus, deleteTask, updateTaskText } from '../services/service';
import CreateTodo from './CreateTodo';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [expandedDates, setExpandedDates] = useState({});

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

  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const startEditing = (taskId, currentText) => {
    setEditTaskId(taskId);
    setEditedText(currentText);
  };

  const saveTask = (taskId) => {
    updateTaskText(taskId, editedText)
    setEditTaskId(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>
      <CreateTodo />
      <div className="mt-4">
        {Object.keys(groupedTasks).reverse().map((date) => (
          <div key={date} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h4>{date}</h4>
              <button
                className="btn btn-light"
                onClick={() => toggleExpand(date)}
                aria-expanded={expandedDates[date]}
              >
                {expandedDates[date] ? '▲' : '▼'}
              </button>
            </div>

            {expandedDates[date] && (
              <ul className="list-group">
                {groupedTasks[date].map((task) => (
                  <li
                    key={task.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-success text-white' : ''}`}
                  >
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleTaskComplete(task.id, task.completed)}
                        className="form-check-input me-2"
                      />
                      {editTaskId === task.id ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          onBlur={() => saveTask(task.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveTask(task.id);
                          }}
                          className="form-control me-2"
                        />
                      ) : (
                        <span className={task.completed ? 'text-decoration-line-through' : ''}>
                          {task.text}
                        </span>
                      )}
                    </div>

                    <div>
                      <button
                        className="btn me-2"
                        onClick={() => startEditing(task.id, task.text)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default TodoList;
