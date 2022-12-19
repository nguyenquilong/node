const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const Cate = require("../models/cate");
const User = require('../models/user');

exports.createPost = (req, res, next) => {
  console.log('req.user', req.userId)

  // User.findById(req.userId)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  // const category = req.body.category;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    userId: req.userId
  });


  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPosts = async (req, res, next) => {
  const cate = req.body.cate;
  try {
    const post = await Post.find({ cate: cate });
    res.status(200).json({ post: post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editPost = (req, res, next) => {
  const postId = req.body.postId;
  const imageUrl = req.file;
  const updateTitle = req.body.title;
  const updateContent = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: "longga" },
  });

  Post.findById(postId).then((post) => {
    post.title = updateTitle;
    post.price = updatedPrice;
    post.content = updateContent;
    post.imageUrl = image.path;
  });
  return post.save().then((result) => {
    res.status(201).json({
      message: "Post edited successfully!",
      post: result,
    });
  });
};
