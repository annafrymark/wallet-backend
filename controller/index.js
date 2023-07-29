const service = require("../service");
const Transaction = require("../service/schemas/transaction");

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
  const id = req.params.transactionId;

  try {
    const result = await service.removeTransaction(id, req.user._id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: `Transaction id: ${id} deleted successfully`,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getDetailedStatistics = async (req, res, next) => {
  const { _id: ownerId } = req.user;
  let { year, month } = req.params;
  year = parseInt(year);
  month = parseInt(month);
  if (!month || !year) {
    return res.status(400).json({ error: 'Please provide month and year' });
  }

  try {
    const expenses = await Transaction.aggregate([
      {
        $match: {
          owner: ownerId,
          category: { $ne: 'Income' },
          $expr: {
            $and: [
              {
                $eq: [{ $year: '$date' }, year,],
              },
              {
                $eq: [{ $month: '$date' }, month,],
              },
            ],
          },
        },
      },  
      {
        $group: {
          _id: null,
          expenses: { $sum: "$sum" },
        },
      },
      {
        $project: {
          _id: 0,
          expenses: 1,
        },
      },
    ]);

    const incomes = await Transaction.aggregate([
      {
        $match: {
          owner: ownerId,
          category: 'Income',
          $expr: {
            $and: [
              {
                $eq: [{ $year: '$date' }, year,],
              },
              {
                $eq: [{ $month: '$date' }, month,],
              },
            ],
          },
        },
      },  
      {
        $group: {
          _id: null,
          incomes: { $sum: "$sum" },
        },
      },
      {
        $project: {
          _id: 0,
          incomes: 1,
        },
      },
    ]);
    
    const expenseBalance = expenses.length ? expenses[0].expenses : 0;
    const incomeBalance = incomes.length ? incomes[0].incomes : 0;

    const balance = incomeBalance - expenseBalance;

    const categories = await Transaction.distinct('category', {
        owner: ownerId,
        $expr: {
          $and: [
            { $eq: [{ $year: '$date' }, year] },
            { $eq: [{ $month: '$date' }, month] },
          ],
        },
    });

    const categoryBalances = [];
    for (const category of categories) {
      if (category !== 'Income') {
        const categoryExpenses = await Transaction.aggregate([
          {
            $match: {
              owner: ownerId,
              category: category,
              $expr: {
                $and: [
                  {
                    $eq: [{ $year: '$date' }, year,],
                  },
                  {
                    $eq: [{ $month: '$date' }, month,],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              expense: { $sum: "$sum" },
            },
          },
          {
            $project: {
              _id: 0,
              expense: 1,
            },
          },
        ]);


        const categoryBalance = categoryExpenses.length ? categoryExpenses[0].expense : 0;
        const color = category.color;

        categoryBalances.push({ category, balance: categoryBalance, color, });
      }
    }

    const result = {
      totalIncome: Math.abs(incomeBalance),
      totalExpenses: Math.abs(expenseBalance),
      balance,
      categoryBalances,
    };


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
};
