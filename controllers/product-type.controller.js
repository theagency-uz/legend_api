const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

const ProductType = require("../models/product-type.model");

module.exports.getTypes = async (req, res, next) => {
  try {
    const types = await ProductType.findAll({
      where: { id: { [Op.ne]: 1000 } },
    });
    res.send(types);
  } catch (err) {
    next(err);
  }
};

module.exports.getTypeBySlug = async (req, res, next) => {
  try {
    const typeSlug = req.params.typeSlug;

    const type = await ProductType.findOne({
      where: { slug: typeSlug },
    });

    res.send(type);
  } catch (err) {
    next(err);
  }
};
