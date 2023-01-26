const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  //console.log("req", JSON.stringify(req.body));
  const errors = validationResult(req);
  //console.log("errors", errors);
  if (!errors.isEmpty()) {
    //console.log("errors 1", errors);
    const error = new Error("Validation failed.");
    console.log('error', error)
    error.statusCode = 422;
    error.data = errors.array();
    res.status(200).json({ message: errors.errors[0].msg, errorCode: 1 });
    // throw error;
  }
  const email = await req.body.email;
  const phonenumber = await req.body.phonenumber;
  const name = await req.body.name;
  const password = await req.body.password;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
      phonenumber: phonenumber,
    });
    console.log(user);
    const result = await user.save();
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {
    console.log("err", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  console.log("req", JSON.stringify(req.body));
  const phonenumber = await req.body.phonenumber;
  const password = await req.body.password;

  let loadedUser;
  try {
    const user = await User.findOne({ phonenumber: phonenumber });
    if (!user) {
      const error = new Error(
        "A user with this phonenumber could not be found."
      );
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        phonenumber: loadedUser.phonenumber,
        userId: loadedUser._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "24h" }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({ message: "User updated." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
