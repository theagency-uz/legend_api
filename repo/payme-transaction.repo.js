const PaymeTransaction = require("../models/payme-transaction.model");

class TransactionRepo {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async getById(transactionId) {
    const item = await this.model.findOne({ where: { id: transactionId } });
    return item;
  }

  async getByFilter(filter) {
    return await this.model.findOne(filter);
  }

  async update(update, filter) {
    return await this.model.update(update, filter);
  }
}

module.exports = new TransactionRepo(PaymeTransaction);
