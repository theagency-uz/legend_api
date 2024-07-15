const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

const Product = require("../models/product.model");
const ProductCategory = require("../models/product-category.model");
const ProductVariation = require("../models/product-variation");
const ProductType = require("../models/product-type.model");

const { makeCondition } = require("../utils/db");

module.exports.getActiveProductsByQuery = async (req, res, next) => {
  try {
    const query = req.query;

    const products = await Product.findAll({
      include: [
        {
          model: ProductVariation,
          ...makeCondition("slug", query.litrage),
        },
        {
          model: ProductCategory,
          ...makeCondition("slug", query.material),
        },
        {
          model: ProductType,
          ...makeCondition("slug", query.gaz),
        },
      ],
      where: {
        isHidden: 0,
      },
    });

    return res.send(products);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductsByQuery = async (req, res, next) => {
  try {
    const query = req.query;

    const isAll = query?.filter === "all";
    const isActive = query?.filter === "active";
    const isDraft = query?.filter === "draft";

    const filterCondition = isAll
      ? {}
      : isActive
      ? makeCondition("isHidden", false)
      : isDraft
      ? makeCondition("isHidden", true)
      : {};
      
    const products = await Product.findAll({ ...filterCondition });

    res.send(products);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductBySlug = async (req, res, next) => {
  try {
    const productSlug = req.params.productSlug;

    const product = await Product.findOne({
      where: { slug: productSlug, isHidden: false },
      // include: [ProductCategory],
    });

    res.send(product);
  } catch (err) {
    next(err);
  }
};
