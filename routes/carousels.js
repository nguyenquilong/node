const express = require("express");
const isAuth = require("../middleware/is-auth");
const carouselsController = require("../controllers/carousels");

const router = express.Router();

router.get("/carousels", carouselsController.getCarosels);

router.post("/carousels", isAuth, carouselsController.createCarosels);

module.exports = router;
