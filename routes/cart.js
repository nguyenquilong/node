const express = require("express");

const cartController = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// router.post("/add", isAuth, postController.getPosts);
router.post("/add", isAuth, cartController.setCart);
router.post("/delete", isAuth, cartController.deleteCart);
router.post("/list", isAuth, cartController.listCart);
router.post("/clear", isAuth, cartController.clearCart);
module.exports = router;
