const jwt = require('jsonwebtoken');

const usersModel = require('../models/Users');

const { JWT_SECRET } = process.env;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    const error = new Error('Token not found');
    error.code = 'unauthorized';
    return next({ error });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await usersModel.findUser(payload.username);
    
    if (!user) {
      const error = new Error('User matching token not found');
      error.code = 'unauthorized';
      return next({ error });
    }

    req.user = user;

    next();
  } catch (error) {
    error.code = 'unauthorized';

    return next({ error });
  }
};
