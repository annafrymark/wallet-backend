const createTransaction = require("./post-transactions");

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
