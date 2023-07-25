const { User } = require("../../service/schemas/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  try {
    // search user by id:
    const user = await User.findOne({ _id });

    // if user is not found:
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized/User is not found",
        data: "Bad request",
      });
    }

    // if user is found:
    user.token = null;
    console.log("Token has been deleted and user is logout");

    await user.save();

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = logout;
