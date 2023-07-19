const Transaction = require("./schemas/transaction");

const addTransaction = (transaction) => {
  const newTransaction = Transaction.create(transaction);
  return newTransaction;
};

module.exports = {
  addTransaction,
};
