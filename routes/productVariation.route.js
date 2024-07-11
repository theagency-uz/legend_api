const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const productVariationController = require("../controllers/productVariation.controller");

// router.get("/", [auth, admin], productVariationController.getProducts);
router.get("/public", productVariationController.getVariations);
router.get(
  "/public/:productSlug",
  productVariationController.getVariationBySlug
);

module.exports = router;
