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
    const postId = req.body.postId
    const user = await User.findById(id);
    if (user === null) {
      return res.status(200).json({
        message: "You are not authorized !",
        status: 2
      })
    }
    Post.findById(postId).then(product => {
      // console.log('product', product)
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

exports.deleteCart = async (req, res, next) => {
  try {
    const id = req.userId;
    const postId = req.body.postId;
    const user = await User.findById(id);
    console.log('id', postId)
    user
      .removeFromCart(postId)
      .then(result => {
        res.status(200).json({ message: "Delete cart success", status: 1 });
      })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    user
      .clearCart()
      .then(result => {
        res.status(200).json({ message: "Clear Cart cart success", status: 1 });
      })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.listCart = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    res.status(200).json({ message: "get cart success", status: 1, cart: user.cart });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};