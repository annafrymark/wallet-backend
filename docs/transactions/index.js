const createTransaction = require("./post-transactions");
const getAllTransactions = require("./get-transactions");

module.exports = {
  paths: {
    "/transactions": {
      ...createTransaction,
      ...getAllTransactions,
    },
    // "/transactions/{id}": {
    //   ...get,
    //   ...update,
    //   ...deleteTr,
    // },
  },
};
