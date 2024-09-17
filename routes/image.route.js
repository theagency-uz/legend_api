const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", [auth, admin], (req, res) => {
  try {
    res.json({
      images: req.files?.images,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
