const Transaction = require("./schemas/transaction");

const addTransaction = (transaction) => {
  const newTransaction = Transaction.create(transaction);
  return newTransaction;
};

const listTransactions = async (owner) => {
  return Transaction.find({ owner: owner });
};

const getTransactionByCategory = (category, owner) => {
  return Transaction.findOne({ category: category, owner: owner });
};

const updateTransaction = (id, transaction, owner) => {
  return Transaction.findByIdAndUpdate({ _id: id, owner: owner }, transaction, {
    new: true,
  });
};

const removeTransaction = (id, owner) => {
  return Transaction.findByIdAndRemove({ _id: id, owner: owner });
};

module.exports = {
  addTransaction,
  listTransactions,
  getTransactionByCategory,
  updateTransaction,
  removeTransaction,
};
