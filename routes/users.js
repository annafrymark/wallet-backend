const express = require("express");
const userController = require('../controller/user');
const auth = require('../middleware-psp/auth/auth');
const router = express.Router();

// auth is middleware to check jwt token
const auth = require("../middleware/auth/auth");

// TODO: Może przenieść informacje serwera do controller? Troszkę oczyści to kod tutaj w routes? Do przedyskutowania
const ctrlUsers = require("../controller/auth");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

//do route ponizej dodamy jeszcze auth
router.get("/current", auth, async (req, res, next) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "current user",
      data: { email: user.email },
    });
  } else {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
      data: "Not authorized",
    });
  }
});

// TODO: check name of middleware and rename it here
router.post("/logout", auth, ctrlUsers.logout);
router.post('/register', userController.singUp);
router.post('login', userController.login);
router.get('/', userController.getAll);
router.get('logout', auth, userController.logout);
router.get('/current', auth, userController.current);
router.patch('/', auth, userController.updateUserDetails);

// const ctrlUsers = require("../controller/auth");

// TODO: check name of middleware and rename it here
// router.post("/logout", MIDDLEWARE, ctrlUsers.logout);





module.exports = router;
