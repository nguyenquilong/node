const express = require("express");
const { body } = require("express-validator");

const cartController = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// router.post("/add", isAuth, postController.getPosts);
router.post("/add", isAuth, cartController.setCart);
router.post("/delete", isAuth, cartController.deleteCart);
module.exports = router;
