const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const Cate = require("../models/cate");

exports.getPosts = async (req, res, next) => {
  const cate = req.body.cate;
  try {
    const post = await Post.find().sort({'_id':-1}).limit(20);
    res
      .status(200)
      .json({ post: post, message: "Get post success", status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
