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
          where: { ...makeCondition("slug", query.litrage) },
        },
        {
          model: ProductCategory,
          where: { ...makeCondition("slug", query.material) },
        },
        {
          model: ProductType,
          where: { ...makeCondition("slug", query.gaz) },
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

module.exports.getProductVariationsByProductId = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
      return res.status(400).send({ errorMsg: "product id must be a number" });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(400).send({ errorMsg: "wrong product id" });
    }

    const productVariations = await Product.findAll({
      include: [
        {
          model: ProductVariation,
        },
        {
          model: ProductCategory,
          where: { ...makeCondition("id", product.productCategoryId) },
        },
        {
          model: ProductType,
          where: { ...makeCondition("id", product.productTypeId) },
        },
      ],
    });

    return res.send(productVariations);
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

module.exports.getActiveProductBySlug = async (req, res, next) => {
  try {
    const productSlug = req.params.productSlug;

    const product = await Product.findOne({
      where: { slug: productSlug, isHidden: false },
    });

    res.send(product);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductBySlug = async (req, res, next) => {
  try {
    const productSlug = req.params.productSlug;

    const product = await Product.findOne({
      where: { slug: productSlug },
    });

    res.send({ product, filters: req.filters });
  } catch (err) {
    next(err);
  }
};

module.exports.editProductBySlug = async (req, res, next) => {
  try {
    const productSlug = req.params.productSlug;
    const newProductData = req.body;

    const newProductSlug = slugify(newProductData.name.ru);

    const product = await Product.findOne({
      where: { slug: productSlug },
    });

    const productTypeId = (
      await ProductType.findOne({
        where: { slug: newProductData.type },
      })
    ).id;
    const productCategoryId = (
      await ProductCategory.findOne({
        where: { slug: newProductData.category },
      })
    ).id;
    const productVariationId = (
      await ProductVariation.findOne({
        where: { slug: newProductData.litrage },
      })
    ).id;

    product.name = newProductData.name;
    product.slug = newProductSlug;
    product.price = newProductData.price;
    product.isHidden = newProductData.isHidden;
    product.code = newProductData.code;
    product.packageCode = newProductData.packageCode;
    product.images = newProductData.imagesUpload;
    product.previewImage = newProductData.previewImageUpload;
    product.itemsPerBlock = newProductData.itemsPerBlock;
    product.productCategoryId = productCategoryId;
    product.productTypeId = productTypeId;
    product.productVariationId = productVariationId;

    await product.save();

    res.send({ product, filters: req.filters, updated: true });
  } catch (err) {
    next(err);
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    const newProductData = req.body;

    const productSlug = slugify(newProductData.name.ru);

    const productTypeId = (
      await ProductType.findOne({
        where: { slug: newProductData.type },
      })
    ).id;
    const productCategoryId = (
      await ProductCategory.findOne({
        where: { slug: newProductData.category },
      })
    ).id;
    const productVariationId = (
      await ProductVariation.findOne({
        where: { slug: newProductData.litrage },
      })
    ).id;

    const createdProduct = await Product.create({
      name: newProductData.name,
      slug: productSlug,
      price: newProductData.price,
      isHidden: newProductData.isHidden,
      code: newProductData.code,
      packageCode: newProductData.packageCode,
      images: newProductData.imagesUpload,
      previewImage: newProductData.previewImageUpload,
      itemsPerBlock: newProductData.itemsPerBlock,
      productCategoryId,
      productTypeId,
      productVariationId,
    });

    res.send({ product: createdProduct, filters: req.filters, created: true });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const productSlug = req.params.productSlug;

    await Product.destroy({ where: { slug: productSlug } });

    res.send({ deleted: true });
  } catch (err) {
    next(err);
  }
};
