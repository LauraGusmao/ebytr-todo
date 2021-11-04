import axios from 'axios';

const tokenKey = 'todo-token';

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
      { headers: { Authorization: localStorage.getItem(tokenKey) } });

    return tasks.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createTask = async (title, description, status) => {
  try {
    const newTask = await axios.post('http://localhost:8080/tasks/new', { title, description, status },
      { headers: { Authorization: localStorage.getItem(tokenKey) } });

    return newTask.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const findTaskById = async (id) => {
  try {
    const task = await axios.get(`http://localhost:8080/tasks/search/${id}`);

    return task.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateTask = async (id, title, description, status) => {
  try {
    await axios.put(`http://localhost:8080/tasks/edit/${id}`, { title, description, status },
      { headers: { Authorization: localStorage.getItem(tokenKey) } });
  } catch (error) {
    console.log('erro', error.response.data);
  }
};
