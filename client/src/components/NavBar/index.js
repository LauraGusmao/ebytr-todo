import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/isolated-layout.svg';
import './style.css';

function NavBar() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img className="nav-logo" src={ logo } alt="Ebytr logo" />
        <Link to="/tasks" className="navbar-brand">Task Manager</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/tasks" className="nav-link">My Tasks</Link>
            </li>
            <li className="navbar-item">
              <Link to="/tasks/create" className="nav-link">Create Task</Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
    </div>
  );
}

export default NavBar;
