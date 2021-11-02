const rescue = require('express-rescue');

const { tasksService } = require('../services');
const { validateTaskBody } = require('../utils');

const createTask = rescue(async (req, res, next) => {
  const { description, status } = req.body;
  const { username } = req.user;

  const { error } = validateTaskBody(req.body);
  if (error) return next(error);

  await tasksService.createTask(description, status, username);
  
  return res.status(201).json({ message: 'New task successfully created' });
});

const getAllTasks = rescue(async (_req, res) => {
  const tasks = await tasksService.getAllTasks();

  return res.status(200).json(tasks);
});

const getUsersTasks = rescue(async (req, res) => {
  const { username } = req.user;

  const usersTasks = await tasksService.getUsersTasks(username);

  return res.status(200).json(usersTasks);
});

const findTaskById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const task = await tasksService.findTaskById(id);

  if (task.error) return next(task);

  return res.status(200).json(task);
});

const updateTask = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { description, status } = req.body;
  const { username } = req.user;

  const { error } = validateTaskBody(req.body);
  if (error) return next(error);

  const updatedTask = await tasksService.updateTask(id, description, status, username);

  return res.status(200).json(updatedTask);
});

const deleteTask = rescue(async (req, res, next) => {
  const { id } = req.params;

  const task = await tasksService.deleteTask(id);

  if (task.error) return next(task);

  return res.status(200).json({ message: 'Task successfully deleted' });
});

module.exports = {
  createTask,
  getAllTasks,
  getUsersTasks,
  findTaskById,
  updateTask,
  deleteTask,
};