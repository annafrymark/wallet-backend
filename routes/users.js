const express = require("express");
const router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

//do route ponizej dodamy jeszcze auth
router.get("/current", async (req, res, next) => {
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

module.exports = router;
