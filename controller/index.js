const service = require("../service");


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

const monthlyYearBalance = async (req, res, next) => { 
  // 
};

module.exports = {
  addTransaction,
  getAllTransactions,
  getTransactionByCategory,
  updateTransaction,
  removeTransaction,
  monthlyYearBalance,
};
