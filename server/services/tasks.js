const tasksModel = require('../models/tasks');

const createTask = async (description, status, responsible) => {
  const newTask = await tasksModel.createTask(description, status, responsible);

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

const updateTask = async (id, description, status, responsible) => {
  const updatedTask = await tasksModel.updateTask(id, description, status, responsible);

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
