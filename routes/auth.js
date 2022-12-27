const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("phonenumber")
      .custom((value, { req }) => {
        return User.findOne({ phonenumber: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Phonenumber already exists!");
          }
        });
      }),     
    body("password").trim().isLength({ min: 5 }).withMessage("Must be > 5."),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.post("/userinfo", isAuth, authController.getUserInfo);

router.get("/status", isAuth, authController.getUserStatus);

router.patch(
  "/status",
  isAuth,
  [body("status").trim().not().isEmpty()],
  authController.updateUserStatus
);

module.exports = router;
