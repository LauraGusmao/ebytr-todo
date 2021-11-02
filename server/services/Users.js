const usersModel = require('../models/users');

const registerUser = async (username, password) => {
  const existingUser = await usersModel.findUser(username);

  if (existingUser) {
    return {
      error: {
        code: 'invalid_data',
        message: 'User already exists',
      },
    };
  }

  const newUser = await usersModel.registerUser(username, password);

  return newUser;
};

// changePassword
// deleteUser

module.exports = {
  registerUser,
};
