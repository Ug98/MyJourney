import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-light flex-column" style={{ marginTop: '20%' }}>
      <ul className="navbar-nav w-100">
        <li className="nav-item">
          <Link className="nav-link btn btn-dark bg-dark text-light" to="/" style={{ marginTop: '10%' }}>Todo</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn btn-dark bg-dark text-light" to="/my-progress" style={{ marginTop: '10%' }}>My Progress</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
