require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { loginRouter, usersRouter } = require('./routes');
const { handleError } = require('./middlewares');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use('/login', loginRouter);
app.use('/users', usersRouter);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
