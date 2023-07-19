const express = require('express');
const router = express.Router();
const controllTransaction = require("../controller");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/", controllTransaction.addTransaction);

module.exports = router;
