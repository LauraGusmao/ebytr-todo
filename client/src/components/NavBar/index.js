import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/isolated-layout.svg';
import './style.css';

function NavBar() {
  const logout = () => {
    localStorage.setItem('todo-token', '');
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <img className="nav-logo" src={ logo } alt="Ebytr logo" />
          <div className="navbar-brand">Task Manager</div>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/tasks" className="nav-link">My Tasks</Link>
              </li>
              <li className="navbar-item">
                <Link to="/tasks/create" className="nav-link">
                  Create Task
                </Link>
              </li>
            </ul>
            <Link to="/" onClick={ logout }>Logout</Link>
          </div>
        </div>
      </nav>
      <br />
    </div>
  );
}

export default NavBar;
