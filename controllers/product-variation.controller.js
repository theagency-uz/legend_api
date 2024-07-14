const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

const ProductVariation = require("../models/product-variation");

module.exports.getVariations = async (req, res, next) => {
  try {
    const variations = await ProductVariation.findAll({});
    res.send(variations);
  } catch (err) {
    next(err);
  }
};

module.exports.getVariationBySlug = async (req, res, next) => {
  try {
    const variationSlug = req.params.variationSlug;

    const variation = await ProductVariation.findOne({
      where: { slug: variationSlug },
    });

    res.send(variation);
  } catch (err) {
    next(err);
  }
};
