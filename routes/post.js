const express = require("express");
const { body } = require("express-validator");

const Post = require("../models/post");
const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/create", isAuth, 
  postController.createPost
);

router.get("/post", isAuth, postController.getPosts);

// router.post("/login", authController.login);

// router.get("/post", isAuth, postController.getPosts);

// router.patch(
//   "/status",
//   isAuth,
//   [body("status").trim().not().isEmpty()],
//   authController.updateUserStatus
// );

module.exports = router;
