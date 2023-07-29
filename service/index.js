const Transaction = require("./schemas/transaction");

const addTransaction = async (transaction) => {
  const newTransaction = Transaction.create(transaction);
  return newTransaction;
};

const listTransactions = async (owner) => {
  return Transaction.find({ owner: owner });
};

const getTransactionByCategory = async (category, owner) => {
  return Transaction.find({ category: category, owner: owner });
};

const updateTransaction = async (id, transaction, owner) => {
  return Transaction.findByIdAndUpdate({ _id: id, owner: owner }, transaction, {
    new: true,
  });
};

const removeTransaction = async (id, owner) => {
  return Transaction.findByIdAndRemove({ _id: id, owner: owner });
};

module.exports = {
  addTransaction,
  listTransactions,
  getTransactionByCategory,
  updateTransaction,
  removeTransaction,
};
