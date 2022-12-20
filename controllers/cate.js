const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Cate = require("../models/cate");

exports.createCate = (req, res, next) => {
  const name = req.body.name;
  const sortorder = req.body.sortorder;
  const status = req.body.status;
  const iconname = req.body.iconname;
  const path = req.body.path;
  const color = req.body.color;
  const cate = new Cate({
    name: name,
    sortorder: sortorder,
    status: status,
    iconname: iconname,
    path : path,
    color: color,
    userId: req.userId
  });
  console.log("cate", name);
  cate
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Cate created successfully!",
        cate: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCates = async (req, res, next) => {
  try {
    const cate = await Cate.find();
    res.status(200).json({ cate: cate });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// exports.editPost = (req, res, next) => {
//   const postId = req.body.postId;
//   const imageUrl = req.file;
//   const updateTitle = req.body.title;
//   const updateContent = req.body.content;
//   const post = new Post({
//     title: title,
//     content: content,
//     imageUrl: imageUrl,
//     creator: { name: "longga" },
//   });

//   Post.findById(postId).then((post) => {
//     post.title = updateTitle;
//     post.price = updatedPrice;
//     post.content = updateContent;
//     post.imageUrl = image.path;
//   });
//   return post.save().then((result) => {
//     res.status(201).json({
//       message: "Post edited successfully!",
//       post: result,
//     });
//   });
// };
