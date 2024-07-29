const Order = require("../models/order.model");

class OrderRepo {
  constructor(model) {
    this.model = model;
  }

  async getById(orderId) {
    return this.model.findById(orderId);
  }
}

module.exports = new OrderRepo(Order);
