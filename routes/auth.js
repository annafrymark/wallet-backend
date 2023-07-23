const express = require("express");
const router = express.Router();

const ctrlUsers = require("../controller/auth");

// TODO: check name of middleware and rename it here
router.post("/logout", MIDDLEWARE, ctrlUsers.logout);

module.exports = router;
