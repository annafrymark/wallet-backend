const userService = require("../service/user");
const {
  userSignInSchema,
  userSignUpSchema,
  userUpdateSchema,
} = require("../service/schemas/userJoi");
const User = require("../service/schemas/user");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const secret = process.env.SECRET;

const getAll = async (req, res, next) => {
  try {
    const results = await User.find();
    res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const singUp = async (req, res, next) => {
  try {
    const { email, password, firstName, confirmPassword } = await req.body;
    const repeatedPassword = password === confirmPassword;
    if (!email || !password || !repeatedPassword) {
      return res.status(400).json({ message: "Missing field!" });
    }
    const user = await userService.getUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: "Email is in use!" });
    }

    const { error } = userSignUpSchema.validate({
      email: email,
      password: password,
      firstName: firstName,
    });
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const verificationToken = uuidv4();
    const newUser = await userService.registerUser(
      email,
      password,
      firstName,
      verificationToken
    );

    if (!newUser) {
      res.status(409).json({ message: `Can't create user!` });
    } else {
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = await req.body;

    const { error } = userSignInSchema.validate({
      email: email,
      password: password,
    });
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const user = await userService.getUserByEmail({ email });

    if (!user || !user.validPassword(password)) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    user.token = token;
    await user.save();
    res.status(200).json({ token, user: { email: user.email } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
        data: "Bad request",
      });
    }

    User.findByIdAndUpdate(_id, { token: null });

    await user.save();

    return res
      .status(204)
      .json({ message: "Token has been deleted and user is logout" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const current = async (req, res, next) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({
      message: "Current user",
      email: user.email,
      firstName: user.firstName,
      balance: user.balance,
    });
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

const updateUserDetails = async (req, res, next) => {
  try {
    const { email, password, firstName } = await req.body;

    const { error } = userUpdateSchema.validate({
      email: email,
      password: password,
      firstName: firstName,
    });
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const user = await userService.getUser({ token: req.user.token });
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const newUser = await userService.updateUser(user.id, {
      email,
      password,
      firstName,
    });
    res.status(200).json({
      email: newUser.email,
      password: newUser.password,
      firstName: newUser.firstName,
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  getAll,
  singUp,
  login,
  logout,
  current,
  updateUserDetails,
};
