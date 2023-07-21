const createTransaction = require("./createTransaction");

module.exports = {
  paths: {
    "/transactions": {
      ...createTransaction,
    },
    // "/transactions/{id}": {
    //   ...get,
    //   ...update,
    //   ...deleteTr,
    // },
  },
};
