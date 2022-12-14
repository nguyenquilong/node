const express = require("express");
const { body } = require("express-validator");

const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/create", isAuth, postController.createPost);

router.get("/post", isAuth, postController.getPosts);

module.exports = router;
