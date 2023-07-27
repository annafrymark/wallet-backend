const Transaction = require("./schemas/transaction");
// import { ObjectId } from "mongoose";

const addTransaction = async (transaction) => {
  const newTransaction = Transaction.create(transaction);
  return newTransaction;
};

const listTransactions = async (owner) => {
  return Transaction.find({ owner: owner });
};

const getTransactionByCategory = async (category, owner) => {
  return Transaction.findOne({ category: category, owner: owner });
};

const updateTransaction = async (id, transaction, owner) => {
  return Transaction.findByIdAndUpdate({ _id: id, owner: owner }, transaction, {
    new: true,
  });
};

const removeTransaction = async (id, owner) => {
  return Transaction.findByIdAndRemove({ _id: id, owner: owner });
};

// const getTMonthlyStatistics = (ownerId, startDate, endDate, type) => {
//   return Transaction.find(
//     {
//       $and: [
//         {
//           type: { $regex: `${type}` },
//           date: { $gte: startDate, $late: endDate },
//           owner: ownerId,
//         },
//       ],
//     },
//     { sum: 1, },
//   ).sort({date: 1});
// };

module.exports = {
  addTransaction,
  listTransactions,
  getTransactionByCategory,
  updateTransaction,
  removeTransaction,
  // getTransactionsByDatesType,
};
