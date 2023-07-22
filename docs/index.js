const transactions = require("./transactions/");
const basicInfo = require("./basicInfo");
const server = require("./servers");
const tags = require("./tags");
const components = require("./components");

module.exports = {
  ...basicInfo,
  ...server,
  ...components,
  ...tags,
  ...transactions,
};
