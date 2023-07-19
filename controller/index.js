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
    //   owner: req.user.id,
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

module.exports = {
  addTransaction,
};
