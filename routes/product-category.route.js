const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const categoryController = require("../controllers/product-category.controller");

// router.get("/", [auth, admin], categoryController.getProducts);
router.get("/public", categoryController.getCategories);
router.get("/public/:categorySlug", categoryController.getCategoryBySlug);

module.exports = router;