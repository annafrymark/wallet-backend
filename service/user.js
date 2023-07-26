const User = require("./schemas/user");

const registerUser = (email, password, firstName, token) => {
  const newUser = new User({
    email,
    password,
    firstName,
    token,
  });
  newUser.setPassword(password);
  return newUser.save();
};

const getUser = (body) => {
  return User.findOne(body);
};

const getAllUsers = () => {
  return User.find({}).distinct("email");
};

const getUserByEmail = (email) => {
  return User.findOne(email);
};

const getUserById = (id) => {
  return User.findById(id);
};

const updateUser = (id, body) => {
  return User.findByIdAndUpdate(id, body, { new: true });
};

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
};
