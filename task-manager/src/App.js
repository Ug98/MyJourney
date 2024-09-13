import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditTodo from './components/EditTodo';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
