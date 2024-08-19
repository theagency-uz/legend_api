const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    res.json({
      images: req.files?.images,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
