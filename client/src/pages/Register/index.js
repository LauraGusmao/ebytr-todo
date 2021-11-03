import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/apiRequests';
import './style.css';

function Register() {
  const [usernameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const TWO_SEC = 2000;
    const timeout = setInterval(() => {
      setSuccess(false);
    }, TWO_SEC);
    return () => clearInterval(timeout);
  }, [success]);

  const handleRegister = async () => {
    try {
      const register = await registerUser(usernameRegister, passwordRegister);

      if (register.data.message) {
        setSuccess(true);
        setUsernameRegister('');
        setPasswordRegister('');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form className="register-form">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
            <input
              type="text"
              className="form-control"
              id="username"
              value={ usernameRegister }
              onChange={ (event) => setUsernameRegister(event.target.value) }
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
              value={ passwordRegister }
              onChange={ (event) => setPasswordRegister(event.target.value) }
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={ handleRegister }
        >
          Submit
        </button>
        { success && <div className="form-text">User successfully registered</div> }
        <div className="form-text mt-4">
          Already a user yet?
          {' '}
          <Link to="/">Login here</Link>
          .
        </div>
      </form>
    </div>
  );
}

export default Register;
