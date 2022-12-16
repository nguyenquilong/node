const express = require("express");
const { body } = require("express-validator");

const cateController = require("../controllers/cate");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/create", isAuth, cateController.createCate);

router.get("/list", cateController.getCates);

module.exports = router;
