const usersModel = require('../models/users');

module.exports = async (username, password) => {
  const user = await usersModel.findUser(username);

  if (!user || user.password !== password) {
    return {
      error: {
        code: 'invalid_data',
        message: 'User does not exist or invalid password',
      },
    };
  }

  return user;
};
