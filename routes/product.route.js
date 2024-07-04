const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/product.controller");

// router.get("/", [auth, admin], productController.getProduct);
router.get("/active", productController.getActiveProducts);

module.exports = router;
