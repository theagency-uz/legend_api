const paymeTransactionService = require("../services/payme-transaction.service");
const clickTransactionService = require("../services/click-transaction.service");

const { PaymeMethod } = require("../enums/payme-transaction.enum");

class TransactionController {
  constructor(paymeService, clickService) {
    this.paymeService = paymeService;
    this.clickService = clickService;
  }

  async payme(req, res, next) {
    try {
      const { method, params, id } = req.body;

      switch (method) {
        case PaymeMethod.CheckPerformTransaction: {
          const result = await this.paymeService.checkPerformTransaction(
            params,
            id
          );
          return res.json({ result });
        }
        case PaymeMethod.CheckTransaction: {
          const result = await this.paymeService.checkTransaction(params, id);
          return res.json({ result, id });
        }
        case PaymeMethod.CreateTransaction: {
          const result = await this.paymeService.createTransaction(params, id);
          return res.json({ result, id });
        }
        case PaymeMethod.PerformTransaction: {
          const result = await this.paymeService.performTransaction(params, id);
          return res.json({ result, id });
        }
        case PaymeMethod.CancelTransaction: {
          const result = await this.paymeService.cancelTransaction(params, id);
          return res.json({ result, id });
        }
        case PaymeMethod.GetStatement: {
          const result = await this.paymeService.getStatement(params, id);
          return res.json({ result, id });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async clickPrepare(req, res, next) {
    try {
      const data = req.body;

      const result = await this.clickService.prepare(data);

      res
        .set({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .send(result);
    } catch (err) {
      next(err);
    }
  }

  async clickComplete(req, res, next) {
    try {
      const data = req.body;

      const result = await this.clickService.complete(data);

      res
        .set({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .send(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TransactionController(
  paymeTransactionService,
  clickTransactionService
);
