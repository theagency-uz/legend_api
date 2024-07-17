const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/",
  [
    body("email").isEmail().exists({ checkFalsy: true }),
    body("password").exists({ checkFalsy: true }),
  ],
  authController.authAdmin
);

module.exports = router;
