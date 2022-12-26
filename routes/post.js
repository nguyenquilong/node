const express = require("express");
const { body } = require("express-validator");

const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/post", postController.getPosts);

module.exports = router;
