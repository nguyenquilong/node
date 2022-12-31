const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();

router.get("/goods", postController.getGoods);

module.exports = router;
