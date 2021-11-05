require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { loginRouter, usersRouter, tasksRouter } = require('./routes');
const { handleError } = require('../src/middlewares');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.use(handleError);

module.exports = app;
