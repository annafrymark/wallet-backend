const createTransaction = require("./post-transaction");
const getAllTransactions = require("./get-allTransactionsOfUser");
const getTransactionByCategory = require("./get-transactionByCategory");
const updateTransaction = require("./put-TransactionUpdate");
const deleteTransaction = require("./delete-transaction");

module.exports = {
  paths: {
    "/transactions": {
      ...createTransaction,
      ...getAllTransactions,
    },
    "/transactions/{category}": {
      ...getTransactionByCategory,
    },
    "/transactions/{transactionId}": {
      ...updateTransaction,
      ...deleteTransaction,
    },
  },
};
