import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyProgress from './components/MyProgress';

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
            <Route path="/my-progress" element={<MyProgress />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
