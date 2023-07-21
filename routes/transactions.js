const express = require('express');
const router = express.Router();
const controllTransaction = require("../controller");


router.post("/", controllTransaction.addTransaction);

module.exports = router;
