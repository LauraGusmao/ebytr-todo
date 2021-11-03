import axios from 'axios';

export const registerUser = async (username, password) => {
  await axios.post('http://localhost:8080/users/new', { username, password })
    .then((resonse) => console.log(resonse))
    .catch((error) => console.log(error));
};

export const login = async (username, password) => {
  const token = await axios.post('http://localhost:8080/login', { username, password });

  return token;
};
