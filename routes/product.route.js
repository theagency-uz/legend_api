const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/product.controller");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/admin", [auth, admin], productController.getProductsByQuery);
router.get(
  "/admin/:productSlug",
  [auth, admin],
  productController.getProductBySlug
);
router.post(
  "/admin",
  [auth, admin],
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
    body("previewImageUpload").isString(),
    check("imagesUpload").custom((value) => {
      if (value && Array.isArray(value)) {
        return value;
      }

      throw new Error("At least one image should be specified");
    }),
    body("price").isInt(),
    body("itemsPerBlock").isInt(),
    body("litrage").isString(),
    body("type").isString(),
    body("category").isString(),
    body("isHidden").isBoolean(),
    body("code").isString(),
    body("packageCode").isString(),
  ],
  productController.createProduct
);
router.put(
  "/admin/:productSlug",
  [auth, admin],
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
    body("previewImageUpload").isString(),
    check("imagesUpload").custom((value) => {
      if (value && Array.isArray(value)) {
        return value;
      }

      throw new Error("Images should be specified");
    }),
    body("price").isInt(),
    body("itemsPerBlock").isInt(),
    body("litrage").isString(),
    body("type").isString(),
    body("category").isString(),
    body("isHidden").isBoolean(),
    body("code").isString(),
    body("packageCode").isString(),
  ],
  productController.editProductBySlug
);
router.delete(
  "/admin/:productSlug",
  [auth, admin],
  productController.deleteProduct
);

router.get("/public", productController.getActiveProductsByQuery);
router.get("/public/:productSlug", productController.getActiveProductBySlug);
router.get(
  "/public/variations/:productId",
  productController.getProductVariationsByProductId
);

module.exports = router;
