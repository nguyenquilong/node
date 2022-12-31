const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const Cate = require("../models/cate");

exports.getGoods = async (req, res, next) => {
  //const cate = req.body.cate;
  try {
    const goods = await Post.find().limit(20);
    res
      .status(200)
      .json({ goods: goods, message: "Get goods success", status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
