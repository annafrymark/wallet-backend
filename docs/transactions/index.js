const createTransaction = require("./post-transaction");
const getAllTransactions = require("./get-allTransactions");
const getTransactionByCategory = require("./get-transactionByCategory");

module.exports = {
  paths: {
    "/transactions": {
      ...createTransaction,
      ...getAllTransactions,
      ...getTransactionByCategory,
    },
    "/transactions/{category}": {
      ...getTransactionByCategory,
    },
  },
};
