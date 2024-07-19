const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/product.controller");

const Product = require("../models/product.model");
const ProductCategory = require("../models/product-category.model");

router.get("/", productController.getProductsByQuery);

router.get("/public", productController.getActiveProductsByQuery);

router.get("/public/:productSlug", productController.getProductBySlug);
router.get(
  "/public/variations/:productId",
  productController.getProductVariationsByProductId
);

// router.post(
//   "/",
//   [
//     body("name").isString().isLength({ min: 3, max: 50 }),
//     check("images").custom((value, { req }) => {
//       if (req.files?.images && Array.isArray(req.files?.images)) {
//         return req.files?.images;
//       }
//       throw Error("Image should be specified.");
//     }),
//     body("price").isInt(),
//     body("volume").isInt(),
//     body("itemsPerBlock").isInt(),
//     body("isGaz").isBoolean(),
//     body("isHidden").isBoolean(),
//     body("productCategoryId")
//       .isInt()
//       .custom(async (value, { req }) => {
//         const productCategory = await ProductCategory.findByPk(value);

//         if (!productCategory) {
//           throw Promise.reject("Product category not found");
//         }

//         return true;
//       }),
//   ],
//   [auth, admin],
//   productController.postProduct
// );

module.exports = router;
