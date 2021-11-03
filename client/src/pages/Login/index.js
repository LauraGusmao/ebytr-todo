import React, { useState } from 'react';
import { login } from '../../services/apiRequests';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [redirect, setRedirect] = useState(false);

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      localStorage.setItem('todo-token', token.data.token);
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
          Submit
        </button>
        <div className="form-text">Not an user yet? </div>
      </form>
    </div>
  );
}

export default Login;
