const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { loginService } = require('../services');
const { validateUserBody } = require('../utils');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = rescue(async (req, res, next) => {
  const { username, password } = req.body;

  const { error } = validateUserBody(req.body);
  if (error) return next(error);

  const userData = await loginService(username, password);
  if (userData.error) return next(userData);

  const jwtConfig = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(userData, JWT_SECRET, jwtConfig);

  return res.status(200).json({ token });
});
