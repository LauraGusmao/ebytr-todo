import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { registerUser } from '../../services/apiRequests';
import logo from '../../assets/default.svg';
import './style.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const usernameFormat = /^[0-9a-zA-Z]+$/;
  const minLength = 5;

  useEffect(() => {
    const TWO_SEC = 2000;
    const timeout = setInterval(() => {
      setSuccess(false);
    }, TWO_SEC);
    return () => clearInterval(timeout);
  }, [success]);

  const handleRegister = async () => {
    try {
      const register = await registerUser(username, password);

      if (register.message) {
        setSuccess(true);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.log(error.response.data);
      // eslint-disable-next-line no-alert
      alert('Invalid data');
    }
  };

  return (
    <div>
      <img className="register-logo" src={ logo } alt="Ebytr logo" />
      <p className="text-center fs-3">Sign up</p>
      <form className="register-form">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
            <input
              type="text"
              className="form-control"
              id="username"
              value={ username }
              onChange={ (event) => setUsername(event.target.value) }
            />
            <div className="form-text mb-0">Min of 5 alphanumeric</div>
            <div className="form-text mt-0">characters</div>
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input
              type="password"
              className="form-control"
              id="password"
              value={ password }
              onChange={ (event) => setPassword(event.target.value) }
            />
            <div className="form-text">Min of 5 characters</div>
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          disabled={ !usernameFormat.test(username) || username.length < minLength
            || password.length < minLength }
          onClick={ handleRegister }
        >
          Submit
        </button>
        { success && <div className="form-text">User successfully registered</div> }
        <div className="form-text mt-4">
          Already a user?
          {' '}
          <Link to="/">Login here</Link>
          .
        </div>
      </form>
    </div>
  );
}

export default Register;
