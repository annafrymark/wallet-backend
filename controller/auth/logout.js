const { userSchema } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await userSchema.findOne({ _id });

  if (!user) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized",
      data: "Bad request",
    });
  }

  userSchema.findByIdAndUpdate(_id, { token: null });
  console.log("Token has been deleted and user is logout");

  await user.save();

  return res.status(204).send();
};

module.exports = logout;