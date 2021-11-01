const connection = require('./connection');

const registerUser = async (username, password) => {
  const newUser = await connection()
    .then((db) => db.collection('users').insetOne({ username, password }))
    .then((result) => result.ops[0].username);
  
  return newUser;
};

const findUser = async (username) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ username }));
  
  if (!user) return null;

  return user;
};

module.exports = { registerUser, findUser };
