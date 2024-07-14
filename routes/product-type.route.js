const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const productTypeController = require("../controllers/product-type.controller");

// router.get("/", [auth, admin], productTypeController.getProducts);
router.get("/public", productTypeController.getTypes);
router.get("/public/:productSlug", productTypeController.getTypeBySlug);

module.exports = router;
