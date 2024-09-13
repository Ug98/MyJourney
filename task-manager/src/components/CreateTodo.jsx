import React, { useState } from 'react';
import { addTask } from '../services/service'; 

function CreateTodo() {
  const [taskInput, setTaskInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      const newTask = {
        text: taskInput,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      addTask(newTask);
      setTaskInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Create Todo</button>
    </form>
  );
}

export default CreateTodo;
