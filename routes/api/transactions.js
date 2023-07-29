const express = require("express");
const router = express.Router();
const controllTransaction = require("../../controller/index");
const auth = require("../../middleware-psp/auth/auth");

router.post("/", auth, controllTransaction.addTransaction);

router.get("/", auth, controllTransaction.getAllTransactions);

router.get("/:category", auth, controllTransaction.getTransactionByCategory);

router.get('/:month/:year', auth, controllTransaction.getDetailedStatistics);

router.put("/:transactionId", auth, controllTransaction.updateTransaction);

// router.patch

router.delete("/:transactionId", auth, controllTransaction.removeTransaction);

module.exports = router;
