const jwt = require('jsonwebtoken');

const usersModel = require('../models/users');

const { JWT_SECRET } = process.env;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Token not found');
    err.code = 'unauthorized';
    return next({ error: { err } });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await usersModel.findUser(payload.padStart.username);
    if (!user) {
      const err = new Error('User matching token not found');
      err.code = 'unauthorized';
      return next({ error: { err } });
    }

    req.user = user;

    next();
  } catch (err) {
    err.code = 'unauthorized';

    return next({ error: { err } });
  }
};
