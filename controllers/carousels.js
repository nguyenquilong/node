// const { validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const Post = require("../models/post");
// const Cate = require("../models/cate");
const mongoose = require("mongoose");
const User = require("../models/user");
const Carousels = require("../models/carousels");

exports.createCarosels = async (req, res, next) => {
  const carouselUrl = req.body.carouselUrl;
  const redirectUrl = req.body.redirectUrl;
  // const cate = req.body.cate;
  const carousel = new Carousels({
    _id: new mongoose.Types.ObjectId(),
    carouselUrl: carouselUrl,
    redirectUrl: redirectUrl,
    userId: req.body.userId,
  });

  console.log("req.body.userId", req.body.userId);

  User.findById(req.body.userId)
    .then((result) => {
      // console.log("result", result);
      if (result.role !== "admin") {
        res.status(200).json({
          message: "You have not pemission.",
          status: 0,
        });
      }
      carousel
        .save(carousel)
        .then((result) => {
          res.status(200).json({
            carousels: result,
            message: "Get post success",
            status: 1,
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCarosels = async (req, res, next) => {
  try {
    const carousels = await Carousels.find();
    res
      .status(200)
      .json({ carousels: carousels, message: "Get post success", status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
