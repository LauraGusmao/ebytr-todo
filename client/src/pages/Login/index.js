import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../services/apiRequests';
import './style.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      localStorage.setItem('todo-token', token.data.token);
      setRedirect(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form className="login-form">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={ (event) => setUsername(event.target.value) }
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={ (event) => setPassword(event.target.value) }
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={ handleLogin }
        >
          Login
        </button>
        <div className="form-text mt-4">
          Not a user yet?
          {' '}
          <Link to="/register">Register here</Link>
          .
        </div>
      </form>
      {redirect && <Redirect to="/tasks" />}
    </div>
  );
}

export default Login;
