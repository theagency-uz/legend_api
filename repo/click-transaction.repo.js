const ClickTransaction = require("../models/click-transaction.model");

class TransactionRepo {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    await this.model.create(data);
  }

  async getById(transactionId) {
    return this.model.findByPk(transactionId);
  }

  async getByFilter(filter) {
    return this.model.findOne(filter);
  }

  async updateById(transactionId, update) {
    return this.model.update(update, { where: { id: transactionId } });
  }
}

module.exports = new TransactionRepo(ClickTransaction);
