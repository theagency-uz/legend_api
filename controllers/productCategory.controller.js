const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

const ProductCategory = require("../models/productCategory.model");

module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll({});
    res.send(categories);
  } catch (err) {
    next(err);
  }
};

module.exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const categorySlug = req.params.categorySlug;

    const category = await ProductCategory.findOne({
      where: { slug: categorySlug },
    });

    res.send(category);
  } catch (err) {
    next(err);
  }
};
