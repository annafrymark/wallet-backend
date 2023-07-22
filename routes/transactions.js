const express = require("express");
const router = express.Router();
const controllTransaction = require("../controller");

//tu ponizej dodamy auth do routes

router.post("/", controllTransaction.addTransaction);

router.get("/", controllTransaction.getAll);

router.get("/:category", controllTransaction.getByCategory);

router.put("/:transactionId", controllTransaction.updateTransaction);

// router.patch

router.delete("/:transactionId", controllTransaction.removeTransaction);

module.exports = router;
