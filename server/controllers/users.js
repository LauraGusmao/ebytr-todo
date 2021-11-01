const rescue = require('express-rescue');

const { usersService } = require('../services');
const { validateBody } = require('../utils');

const registerUser = rescue(async (req, res, next) => {
  const { username, password } = req.body;

  const { error } = validateBody(req.body);
  if (error) return next(error);

  const newUser = await usersService.registerUser(username, password);
  if (newUser.error) return next(newUser);

  return res.status(201).json({ message: 'New user successfully created', newUser });
});

module.exports = {
  registerUser,
};
