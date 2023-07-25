const transactions = require("./transactions/");
const users = require("./users");
const basicInfo = require("./basicInfo");
const server = require("./servers");
const tags = require("./tags");
const components = require("./components");

module.exports = {
  ...basicInfo,
  ...server,
  ...components,
  ...tags,
  ...users,
  ...transactions,
};
