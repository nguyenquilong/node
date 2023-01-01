const express = require("express");
const isAuth = require("../middleware/is-auth");
const carouselsController = require("../controllers/carousels");

const router = express.Router();

router.get("/lists", carouselsController.getCarosels);

router.post("/lists", isAuth, carouselsController.createCarosels);

module.exports = router;
