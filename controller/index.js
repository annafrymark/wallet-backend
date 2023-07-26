const service = require("../service");
const Transaction = require("../service/schemas/transaction");
//const { addTransactionSchema, editTransactionSchema, sortTransactionsSchema } = require("../service/schemas/transactionJoi");
//const categories = require('../service/categories');
//const { number } = require("joi");

const addTransaction = async (req, res, next) => {
  const { date, type, category, comment, sum } = req.body;
  try {
    const result = await service.addTransaction({
      date,
      type,
      category,
      comment,
      sum,
      owner: req.user.id,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { transaction: result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    // const result = await service.listTransactions();
    const result = await service.listTransactions(req.user._id);
    res.json({
      status: "success",
      code: 200,
      data: { transactions: result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTransactionByCategory = async (req, res, next) => {
  const category = req.params.category;
  try {
    const result = await service.getTransactionByCategory(
      category,
      req.user._id
    );
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { transaction: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found transactions by category: ${category}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  const id = req.params.transactionId;
  const { date, type, category, comment, sum } = req.body;
  try {
    const result = await service.updateTransaction(
      id,
      {
        date,
        type,
        category,
        comment,
        sum,
      },
      req.user._id
    );
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { transaction: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found transaction id ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const removeTransaction = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.removeTransaction(id, req.user._id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: `Not found contact id: ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// const monthlyYearBalance = async (req, res, next) => {
//   const { id } = req.user;
//   const { month, year } = req.params;

//   const startDate = new Date(year, month - 1, 1);
//   const endDate = new Date(year, month, 0, 23, 59, 59);

//   const { error } = sortTransactionsSchema.validate(req.params);

//   if (error) {
//     res.status(400).json({ message: error.details[0].message });
//     return;
//   }

//   try {
//     const incomeTransactions = await service.getTransactionsByDatesType(id, startDate, endDate, 'Income');
//     const incomes = incomeTransactions
//       .map(transaction => transaction.sum)
//       .reduce((previousValue, number) => {
//         outcome = previousValue + number;
//         return outcome;
//       }, 0);

//     const expenseTransactions = await service.getTransactionsByDatesType(id, startDate, endDate, 'Expense');
//     const expenses = expenseTransactions
//       .map(transaction => transaction.sum)
//       .reduce((previousValue, number) => {
//         outcome = previousValue + number;
//         return outcome;;
//       }, 0);

//     const balance = Number(incomes - expenses);

//     const result = await service.getTransactionByCategory(
//       category,
//       req.user._id
//     );

//     ////////Tu utknęłam

//     res.json({
//         status: "success",
//         code: 200,
//         data: { incomes, expenses, balance, },
//       });

//   } catch (error) {
//     console.error(error.message);
//     next(error);
//   }
// };

const getDetailedStatistics = async (req, res, next) => {
  const { _id: ownerId } = req.user;
  let { year, month } = req.query;
  year = parseInt(year);
  month = parseInt(month);

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: ownerId,
          year,
          month,
        },
      },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$sum" },
        },
      },
      {
        $group: {
          _id: null,
          expenses: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", false] }, "$total", 0],
            },
          },
          incomes: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", true] }, "$total", 0],
            },
          },
          categoriesSummary: {
            $push: {
              $cond: [
                { $eq: ["$_id.type", true] },
                { category: "$_id.category", total: "$total" },
                null,
              ],
            },
          },
        },
      },
      {
        $unwind: "$categoriesSummary",
      },
      {
        $match: {
          categoriesSummary: { $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          expenses: { $first: "$expenses" },
          incomes: { $first: "$incomes" },
          categoriesSummary: { $push: "$categoriesSummary" },
        },
      },
      {
        $project: {
          _id: 0,
          expenses: 1,
          incomes: 1,
          categoriesSummary: 1,
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found`,
        data: "Not found",
      });
    } else {
      return res.json({
        status: "success",
        code: 200,
        data: { transaction: result },
      });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  addTransaction,
  getAllTransactions,
  getTransactionByCategory,
  updateTransaction,
  removeTransaction,
  getDetailedStatistics,
  // monthlyYearBalance,
};
