const express = require("express");

const cartController = require("../controllers/cart");
const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// router.post("/add", isAuth, postController.getPosts);
router.post("/add", isAuth, cartController.setCart);
router.post("/delete", isAuth, cartController.deleteCart);
router.post("/list", isAuth, cartController.listCart);
router.post("/clear", isAuth, cartController.clearCart);
router.post("/confirm", isAuth, orderController.postOrder);

module.exports = router;
