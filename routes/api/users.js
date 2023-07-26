const express = require("express");
const userController = require("../../controller/user");
const auth = require("../../middleware-psp/auth/auth");
const router = express.Router();

router.post("/register", userController.singUp);

router.post("/login", userController.login);

router.get("/", userController.getAll);

router.get("/current", auth, userController.current);

router.patch("/", auth, userController.updateUserDetails);

router.post("/logout", auth, userController.logout);

module.exports = router;
