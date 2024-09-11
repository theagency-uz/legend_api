const { Op } = require("sequelize");

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

  async getByTransactionPeriod(from, to) {
    return await this.model.findAll({
      order: [["create_time", "ASC"]],
      where: {
        create_time: { [Op.between]: [from, to] },
      },
    });
  }
}

module.exports = new TransactionRepo(PaymeTransaction);
