import axios from 'axios';

export const registerUser = async (username, password) => {
  const register = await axios.post('http://localhost:8080/users/new', { username, password });

  return register.data;
};

export const login = async (username, password) => {
  const token = await axios.post('http://localhost:8080/login', { username, password });

  return token;
};

export const getUsersTasks = async () => {
  try {
    const tasks = await axios.get('http://localhost:8080/tasks/user',
      { headers: { Authorization: localStorage.getItem('todo-token') } });

    return tasks.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createTask = async (title, description, status) => {
  const newTask = await axios.post('http://localhost:8080/tasks/new', { title, description, status },
    { headers: { Authorization: localStorage.getItem('todo-token') } });

  return newTask.data;
};
