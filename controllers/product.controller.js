const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Product = require("../models/product.model");
const ProductCategory = require("../models/productCategory.model");

module.exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ model: ProductCategory }],
    });

    res.send(products);
  } catch (err) {
    next(err);
  }
};

module.exports.getActiveProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ model: ProductCategory }],
      where: {
        isHidden: 0,
      },
    });

    res.send(products);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductsLimited = async (req, res, next) => {
  try {
    const number = +req.params.number;
    const sort = req.params.sort;
    if (isNaN(number)) {
      return res.status(400).send("Limit should be number");
    }
    let products;
    switch (sort) {
      case "popular":
        products = await Product.findAll({
          where: { isHidden: 0 },
          order: [
            ["viewsCount", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: number,
          include: [
            { model: ProductCategory },
            { model: Brand },
            { model: ProductType },
            { model: ProductSpecification },
          ],
        });
        break;
      case "exclusive":
        products = await Product.findAll({
          order: [["createdAt", "DESC"]],
          limit: number,
          include: [
            { model: ProductCategory },
            { model: Brand },
            { model: ProductType },
            { model: ProductSpecification },
          ],
          where: { brandId: 1, isHidden: 0 },
        });
        break;
      case "discount":
        products = await Product.findAll({
          where: { isHidden: 0 },
          order: [
            ["discount", "DESC"],
            ["createdAt", "DESC"],
          ],
          limit: number,
          include: [
            { model: ProductCategory },
            { model: Brand },
            { model: ProductType },
            { model: ProductSpecification },
          ],
        });
        break;
      case "new":
        products = await Product.findAll({
          where: { isHidden: 0 },
          order: [["createdAt", "DESC"]],
          limit: number,
          include: [
            { model: ProductCategory },
            { model: Brand },
            { model: ProductType },
            { model: ProductSpecification },
          ],
        });
        break;

      default:
        break;
    }

    res.send(products);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;
    const product = await Product.findByPk(productId, {
      include: [
        Brand,
        ProductCategory,
        ProductType,
        ProductSpecification,
        PackageCode,
      ],
    });
    if (user && (user.userRoleId === 1 || user.userRoleId === 2)) {
      return res.send(product);
    }
    if (product?.isHidden === 1) {
      res.status(404).send("Product is not found");
    }
    res.send(product);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductBySlug = async (req, res, next) => {
  try {
    const productSlug = req.params.productSlug;
    const product = await Product.findOne({
      where: { slug: productSlug, isHidden: 0 },
      include: [
        Brand,
        ProductCategory,
        ProductType,
        ProductSpecification,
        {
          model: ProductVariation,
          where: { isHidden: false },
          order: [["order", "ASC"]],
          separate: true,
          include: [
            {
              model: ProductVariationTypeItem,
              include: ProductVariationType,
            },
          ],
        },
      ],
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductCategory = async (req, res, next) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.send(productCategories);
  } catch (err) {
    next(err);
  }
};

module.exports.getProductCategoryById = async (req, res, next) => {
  try {
    const productCategoryId = req.params.productCategoryId;
    const productCategory = await ProductCategory.findByPk(productCategoryId);
    if (!productCategory) {
      return res.status(404).send("Product Category not found!");
    }
    res.send(productCategory);
  } catch (err) {
    next(err);
  }
};

module.exports.postProduct = async (req, res, next) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    let images = (req.files?.image ?? req.files?.images) || [];

    if (!Array.isArray(images)) {
      images = [images];
    }

    let imageUrls = images.map((i) => i.path.replace(/\\/g, "/"));

    const result = await Product.create({
      name: req.body.name,
      slug: req.body.slug,
      images: imageUrls,
      price: req.body.price,
      isHidden: req.body.isHidden === "true" ? 1 : 0,
      productCategoryId: req.body.productCategoryId,
      volume: req.body.volume,
      itemsPerBlock: req.body.itemsPerBlock,
      isGaz: req.body.isGaz === "true" ? 1 : 0,
      createdAt: new Date(),
    });

    return res.send(result);
  } catch (err) {
    next(err);
  }
};

module.exports.postProductCategory = async (req, res, next) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const result = await ProductCategory.create({
      name: JSON.parse(req.body.name),
      slug: req.body.slug,
    });

    res.send(result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    let images = req.files?.imageProduct || [];
    if (!Array.isArray(images)) {
      images = [images];
    }
    let imageUrl = images.map((i) => i.path.replace(/\\/g, "/"));
    const types = req.body.types;
    if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        images = req.body.images.map((i) => JSON.parse(i));
      } else {
        images = [JSON.parse(req.body.images)];
      }
    } else {
      images = [];
    }

    let product = await Product.findByPk(productId);
    if (!product) {
      imageUrl.map(async (i) => {
        await fileHelper.deleteFile(i);
      });
      return res.status(404).send("Product not found");
    }
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      imageUrl.map(async (i) => {
        await fileHelper.deleteFile(i);
      });
      return res.status(400).send(errors.array());
    }
    const pyramid = req.body.pyramid.map((p) => JSON.parse(p));
    let specifications = req.body.specifications || [];
    if (!Array.isArray(specifications)) {
      specifications = [specifications];
    }
    let currentImages = [];
    let imageCounter = 0;
    images.map((image) => {
      if (image.file) {
        currentImages.push(imageUrl[imageCounter]);
        imageCounter++;
      } else {
        let index = image.src.indexOf("/images");
        currentImages.push(image.src.slice(index));
      }
    });

    const result = await Product.update(
      {
        name: req.body.name,
        slug: req.body.slug,
        images: currentImages,
        price: req.body.price,
        description: JSON.parse(req.body.description),
        details: JSON.parse(req.body.details),
        discount: req.body.discount || 0,
        artikul: req.body.artikul,
        isHidden: req.body.isHidden === "true" ? 1 : 0,
        brandId: req.body.brandId,
        productCategoryId: req.body.productCategoryId,
        productTypeId: req.body.typeId,
        productOfTheDay: req.body.productOfTheDay === "true" ? 1 : 0,
        pyramid: pyramid,
        createdAt: req.body.createdAt,
        packageCodeId: req.body.packageCodeId,
        isDiscountable: req.body.isDiscountable,
      },
      { where: { id: productId }, returning: true }
    );

    product = await Product.findByPk(productId);
    await product.setProduct_specifications(specifications);

    res.send(result);

    const currentProduct = await Product.findByPk(productId, {
      include: [{ model: Brand }],
    });

    contentPostProduct(currentProduct, "update");
  } catch (err) {
    next(err);
  }
};

module.exports.updateProductCategory = async (req, res, next) => {
  try {
    const productCategoryId = req.params.productCategoryId;
    const image = req.files?.image;
    let imageUrl = image?.path.replace(/\\/g, "/");
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (imageUrl) {
        fileHelper.deleteFile(imageUrl);
      }
      return res.status(400).send(errors.array());
    }

    let productCategory = await ProductCategory.findByPk(productCategoryId);
    if (!productCategory) {
      if (imageUrl) {
        await fileHelper.deleteFile(imageUrl);
      }
      return res.status(404).send("Product Category not found!");
    }
    if (req.body.imagePath) {
      imageUrl = req.body.imagePath;
    }
    const result = await ProductCategory.update(
      {
        name: JSON.parse(req.body.name),
        slug: req.body.slug,
        imageUrl: imageUrl,
      },
      { where: { id: productCategoryId } }
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const result = await Product.destroy({
      where: { id: productId },
    });
    product.images.map(async (i) => {
      await fileHelper.deleteFile(i);
    });

    res.sendStatus(200);

    try {
      await contentDeleteProduct(productId);
    } catch (err) {}
  } catch (err) {
    next(err);
  }
};

module.exports.deleteProductCategory = async (req, res, next) => {
  try {
    const productCategoryId = req.params.productCategoryId;
    const productCategory = await ProductCategory.findByPk(productCategoryId);
    if (!productCategory) {
      return res.status(404).send("Product category not found!");
    }
    const result = await ProductCategory.destroy({
      where: { id: productCategoryId },
    });
    await fileHelper.deleteFile(productCategory.imageUrl);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBulkProduct = async (req, res, next) => {
  try {
    const productIds = req.body.ids;

    const products = [];
    for (let i = 0; i < productIds.length; i++) {
      const product = await Product.findByPk(productIds[i]);
      products.push(product);
    }
    products.forEach((p) => {
      fileHelper.deleteFile(p.images);
    });

    const result = await Product.destroy({
      where: { id: [...productIds] },
    });
    res.sendStatus(200);

    try {
      for (let i = 0; i < productIds.length; i++) {
        await contentDeleteProduct(productIds[i]);
      }
    } catch (err) {}
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBulkProductCategory = async (req, res, next) => {
  try {
    const productCategoryIds = req.body.ids;

    const categories = [];
    for (let i = 0; i < productCategoryIds.length; i++) {
      const category = await ProductCategory.findByPk(productCategoryIds[i]);
      categories.push(category);
    }
    categories.forEach((c) => {
      fileHelper.deleteFile(c.imageUrl);
    });

    const result = await ProductCategory.destroy({
      where: { id: [...productCategoryIds] },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports.priceImport = async (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    let products = JSON.parse(req.body.products);

    let updateProduct = 0;
    let updateVariation = 0;
    for (let i = 0; i < products.length; i++) {
      let resultProduct = await Product.update(
        {
          price: products[i]?.price,
          discount: products[i]?.discount || 0,
        },
        {
          where: { artikul: String(products[i]?.artikul) },
        }
      );

      if (resultProduct?.[0]) {
        updateProduct++;
      }

      let resultVariation = await ProductVariation.update(
        {
          price: products[i]?.price,
          discount: products[i]?.discount || 0,
        },
        {
          where: { artikul: String(products[i]?.artikul) },
        }
      );
      if (resultVariation?.[0]) {
        updateVariation++;
      }
    }

    //change product visibility
    const productsDb = await Product.findAll();

    let productHidden = 0;
    let productShow = 0;
    for (let i = 0; i < productsDb.length; i++) {
      let productImport = products.find(
        (p) => String(p.artikul) === String(productsDb[i].artikul)
      );

      if (productImport) {
        if (productsDb[i].isHidden) {
          await Product.update(
            {
              isHidden: 0,
            },
            {
              where: { artikul: productsDb[i].artikul },
            }
          );
          productShow++;
        }
      } else {
        await Product.update(
          {
            isHidden: 1,
          },
          {
            where: { artikul: productsDb[i].artikul },
          }
        );
        productHidden++;
      }
    }

    return res.send({
      products: updateProduct,
      variations: updateVariation,
      productHidden: productHidden,
      productShow: productShow,
    });

    // const currentProduct = await Product.findByPk(result.id, { include: [{ model: Brand }] });

    // contentPostProduct(currentProduct);
  } catch (err) {
    next(err);
  }
};

module.exports.fileImport = async (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    let products;

    if (Array.isArray(req.body.products)) {
      products = req.body.products.map((p) => JSON.parse(p));
    } else {
      products = [JSON.parse(req.body.products)];
    }

    const productVariationTypeItems = await ProductVariationTypeItem.findAll();
    const brands = await Brand.findAll();
    const categories = await ProductCategory.findAll();
    const types = await ProductType.findAll();
    const codes = await PackageCode.findAll();
    const productsDb = await Product.findAll();

    const variationsReady = [];
    let productId;
    const productsUpdateReady = [];
    const productsCreateReady = [];
    products.forEach((product) => {
      if (!product.variation) {
        productId = product.id;

        let exists = productsDb.find(
          (pdb) => pdb.id === product.id || pdb.artikul === product.artikul
        );

        let tempProduct = Object.assign(
          {},
          product.id ? { id: product.id } : null,
          product.artikul ? { artikul: product.artikul } : null,
          product.name ? { name: product.name } : null,
          product.slug ? { slug: product.slug } : null,
          product.price ? { price: product.price } : null,
          product.discount ? { price: product.discount } : null,
          !exists ? { isHidden: 1 } : null,
          product.descriptionRu
            ? {
                description: {
                  ru: product.descriptionRu,
                  uz: product.descriptionUz,
                },
              }
            : null,
          product.pyramidTopRu
            ? {
                pyramid: [
                  {
                    ru: product.pyramidTopRu,
                    uz: product.pyramidTopUz,
                    en: product.pyramidTopEn,
                  },
                  {
                    ru: product.pyramidHeartRu,
                    uz: product.pyramidHeartUz,
                    en: product.pyramidHeartEn,
                  },
                  {
                    ru: product.pyramidBaseRu,
                    uz: product.pyramidBaseUz,
                    en: product.pyramidBaseEn,
                  },
                ],
              }
            : null,
          product.brand && brands.find((b) => b.name === product.brand)?.id
            ? { brandId: brands.find((b) => b.name === product.brand)?.id }
            : null,
          product.product_category &&
            categories.find((c) => c.name.ru === product.product_category)?.id
            ? {
                productCategoryId: categories.find(
                  (c) => c.name.ru === product.product_category
                )?.id,
              }
            : null,
          product.product_type &&
            types.find((t) => t.name === product.product_type)?.id
            ? {
                productTypeId: types.find(
                  (t) => t.name === product.product_type
                ).id,
              }
            : null,
          product.package_code &&
            codes.find((c) => String(c.code) === String(product.package_code))
              ?.id
            ? {
                packageCodeId: codes.find(
                  (c) => String(c.code) === String(product.package_code)
                )?.id,
              }
            : null
        );

        if (exists) {
          productsUpdateReady.push(tempProduct);
        } else {
          if (
            tempProduct.name &&
            tempProduct.slug &&
            tempProduct.artikul &&
            tempProduct.price &&
            tempProduct.brandId &&
            tempProduct.packageCodeId
          ) {
            productsCreateReady.push(tempProduct);
          }
        }
      } else {
        variationsReady.push({
          artikul: product.artikul,
          name: product.name,
          price: product.price,
          discount: product.discount,
          productId: productId,
          productVariationTypeItemId: productVariationTypeItems.find(
            (item) => item.name.ru === product.variation
          ).id,
        });
      }
    });

    let resultUpdateProduct = 0;
    for (let i = 0; i < productsUpdateReady.length; i++) {
      let tempProduct = productsUpdateReady[i];
      let result = await Product.update(tempProduct, {
        where: {
          [Op.or]: [
            { id: tempProduct.id || 0 },
            { artikul: tempProduct.artikul || "" },
          ],
        },
      });
      if (result?.[0]) {
        resultUpdateProduct++;
      }
    }

    const resultCreateProduct = await Product.bulkCreate(productsCreateReady);

    const resultVariation = await ProductVariation.bulkCreate(variationsReady, {
      updateOnDuplicate: [
        "name",
        "price",
        "discount",
        "productId",
        "productVariationTypeItemId",
      ],
    });

    return res.send({
      productUpdate: resultUpdateProduct,
      productCreate: resultCreateProduct,
      variation: resultVariation,
    });
  } catch (err) {
    next(err);
  }
};
