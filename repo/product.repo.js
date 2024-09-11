const Product = require("../models/product.model");

class ProductRepo {
  constructor(model) {
    this.model = model;
  }

  async getById(productId) {
    return this.model.findByPk(productId);
  }
}

module.exports = new ProductRepo(Product);
