const express = require("express");
const userController = require('../controller/user');
const auth = require('../middleware-psp/auth/auth');
const router = express.Router();

router.post('/register', userController.singUp);
router.post('login', userController.login);
router.get('/', userController.getAll);
// router.get('logout', auth, userController.logout);
router.get('/current', auth, userController.current);
router.patch('/', auth, userController.updateUserDetails);

const ctrlUsers = require("../controller/auth");

// TODO: check name of middleware and rename it here
router.post("/logout", MIDDLEWARE, ctrlUsers.logout);





module.exports = router;
