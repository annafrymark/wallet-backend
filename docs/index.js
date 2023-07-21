const createTransaction = require("./transactions/createTransaction");
const basicInfo = require("./basicInfo");
const server = require("./servers");
const tags = require("./tags");
const components = require("./components");

module.exports = {
  ...basicInfo,
  ...server,
  ...tags,
  ...components,
  ...createTransaction,
};
