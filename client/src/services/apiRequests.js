import axios from 'axios';

export const registerUser = async (username, password) => {
  const register = await axios.post('http://localhost:8080/users/new', { username, password });

  return register;
};

export const login = async (username, password) => {
  const token = await axios.post('http://localhost:8080/login', { username, password });

  return token;
};
