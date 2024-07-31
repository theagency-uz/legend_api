const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

class OrderRepo {
  constructor(model, orderItemModel) {
    this.model = model;
    this.orderItemModel = orderItemModel;
  }

  async getById(orderId) {
    return this.model.findByPk(orderId);
  }

  async update(update, filter) {
    return this.model.update(update, filter);
  }

  async findOrderItemsById(orderId) {
    return this.orderItemModel.findAll({ where: { orderId } });
  }
}

module.exports = new OrderRepo(Order, OrderItem);
