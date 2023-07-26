const getAllUsers = require("./get-allUsers");
const createUser = require("./post-userRegister");
const loginUser = require("./post-userLogin");
const currentUser = require("./get-userCurrent");
const updateUser = require("./patch-userDetails");
const logoutUser = require("./post-userLogout");

module.exports = {
  "/users": {
    ...getAllUsers,
    ...updateUser,
  },
  "/users/register": {
    ...createUser,
  },
  "/users/login": {
    ...loginUser,
  },
  "/users/current": {
    ...currentUser,
  },

  "/users/logout": {
    ...logoutUser,
  },
};
