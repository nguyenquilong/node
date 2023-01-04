const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const Cate = require("../models/cate");
const User = require("../models/user");

exports.setCart = async (req, res, next) => {
  try {
    // find user
    const postId = req.body.postId;
    const id = req.userId;
    const user = await User.findById(id);
    if (user) {
      user.cart.push(postId);
    }
    res.status(200).json({ message: "Add cart success", status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
