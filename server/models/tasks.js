const { ObjectId } = require('mongodb');
const connection = require('./connection');

const { getDate } = require('../utils');

const createTask = async (description, status, responsible) => {
  const date = getDate();

  const newUser = await connection()
    .then((db) => db.collection('tasks')
    .insertOne({ description, status, responsible, date }));
  
  return newUser;
};

const getAllTasks = async () => {
  const tasks = await connection()
    .then((db) => db.collection('tasks').find().toArray());

  return tasks;
};

const getUsersTasks = async (responsible) => {
  const usersTasks = await connection()
    .then((db) => db.collection('tasks')
    .find({ responsible }).toArray());

  if (!usersTasks) return null;

  return usersTasks;
};

const findTaskById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const task = await connection()
    .then((db) => db.collection('tasks').findOne(new ObjectId(id)));

  if (!task) return null;

  return task;
};

const updateTasks = async (id, description, status, responsible) => {
  if (!ObjectId.isValid(id)) return null;

  await connection().then((db) => db.collection('tasks')
    .updateOne({ _id: ObjectId(id) }, { $set: { description, status, responsible } }));

  return { _id: id, description, status, responsible };
};

const deleteTask = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const deleted = await connection()
    .then((db) => db.collection('tasks').deleteOne({ _id: ObjectId(id) }));

  return deleted;
};

module.exports = {
  createTask,
  getAllTasks,
  getUsersTasks,
  findTaskById,
  updateTasks,
  deleteTask,
};
