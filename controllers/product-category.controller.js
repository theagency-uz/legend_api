const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

const ProductCategory = require("../models/product-category.model");

module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll({
      where: { id: { [Op.ne]: 1000 } },
    });
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
