const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const Cate = require("../models/cate");
const User = require("../models/user");

exports.setCart = async (req, res, next) => {
  try {
    // find user
    const id = req.userId;
    const postId = req.body.postId;
    const user = await User.findById(id);
    Post.findById(postId).then(product => {
      return user.addToCart(product)
    }).then(result => {
      res.status(200).json({ message: "Add cart success", status: 1 });
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteCart =async (req, res, next) => {
  try {
  const id = req.userId;
    const postId = req.body.postId;
    const user = await User.findById(id);
  user
    .removeFromCart(postId)
    .then(result => {
      res.status(200).json({ message: "Delete cart success", status: 1 });
    })    
}catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
} };