const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/product.controller");

const Product = require("../models/product.model");
const ProductCategory = require("../models/product-category.model");

router.get("/admin", productController.getProductsByQuery);
router.get("/admin/:productSlug", productController.getProductBySlug);
router.put(
  "/admin/:productSlug",
  [
    body("name")
      .isObject()
      .custom((value) => {
        if (
          Object.keys(value).includes("ru") &&
          Object.keys(value).includes("uz")
        ) {
          return value;
        }

        throw new Error("Invalid name structure");
      }),
    check("previewImageUpload").custom((value) => {
      if (value && Array.isArray(value)) {
        return value;
      }

      throw new Error("Image should be specified");
    }),
    check("imagesUpload").custom((value) => {
      if (value && Array.isArray(value)) {
        return value;
      }

      throw new Error("Image should be specified");
    }),
    body("price").isInt(),
    body("litrage").isString(),
    body("type").isString(),
    body("category").isString(),
    body("isHidden").isBoolean(),
    body("code").isString(),
    body("packageCode").isString(),
  ],
  productController.editProductBySlug
);

router.get("/public", productController.getActiveProductsByQuery);
router.get("/public/:productSlug", productController.getActiveProductBySlug);
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
