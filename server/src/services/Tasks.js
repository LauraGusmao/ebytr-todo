const tasksModel = require('../models/Tasks');

const createTask = async (title, description, status, responsible) => {
  const newTask = await tasksModel.createTask(title, description, status, responsible);

  return newTask;
};

const getAllTasks = async () => {
  const tasks = await tasksModel.getAllTasks();

  return tasks;
};

const getUsersTasks = async (responsible) => {
  const usersTasks = await tasksModel.getUsersTasks(responsible);

  return usersTasks;
};

const findTaskById = async (id) => {
  const task = await tasksModel.findTaskById(id);

  if (!task) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return task;
};

const updateTask = async (id, title, description, status, responsible) => {
  const updatedTask = await tasksModel.updateTask(id, title, description, status, responsible);

  return updatedTask;
};

const deleteTask = async (id) => {
  const task = await tasksModel.findTaskById(id);

  if (!task) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const deleted = await tasksModel.deleteTask(id);

  return deleted;
};

module.exports = {
  createTask,
  getAllTasks,
  getUsersTasks,
  findTaskById,
  updateTask,
  deleteTask,
};
