const ProductCategory = require("../models/product-category.model");
const ProductVariation = require("../models/product-variation");
const ProductType = require("../models/product-type.model");

module.exports = async function (req, res, next) {
  try {
    req.filters = {};

    const categories = await ProductCategory.findAll({
      attributes: ["id", "name", "slug"],
    });
    const types = await ProductType.findAll({
      attributes: ["id", "name", "slug"],
    });
    const variations = await ProductVariation.findAll({
      attributes: ["id", "slug"],
    });

    if (categories.length) {
      req.filters.categories = categories;
    }

    if (types.length) {
      req.filters.types = types;
    }

    if (variations.length) {
      req.filters.variations = variations;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
