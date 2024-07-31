const transactionRepo = require("../repo/payme-transaction.repo");
const userRepo = require("../repo/user.repo");
const productRepo = require("../repo/product.repo");
const orderRepo = require("../repo/order.repo");

const {
  PaymeError,
  PaymeData,
  TransactionState,
} = require("../enums/payme-transaction.enum");

const TransactionError = require("../errors/payme-transaction.error");

class TransactionService {
  constructor(repo, userRepo, productRepo, orderRepo) {
    this.repo = repo;
    this.userRepo = userRepo;
    this.productRepo = productRepo;
    this.orderRepo = orderRepo;
  }

  async validate(params, id) {
    const {
      account: { order_id: orderId },
    } = params;

    let { amount } = params;

    amount = Math.floor(amount / 100);

    const order = await this.orderRepo.getById(orderId);

    if (!order) {
      throw new TransactionError(
        PaymeError.OrderNotFound,
        id,
        PaymeData.OrderId
      );
    }

    if (amount !== order.totalPrice) {
      throw new TransactionError(PaymeError.InvalidAmount, id);
    }
  }

  async checkPerformTransactionDetail(orderId) {
    const items = [];

    const orderItems = await this.orderRepo.findOrderItemsById(orderId);

    for (const orderItem of orderItems) {
      const count = orderItem.count;

      const product = await this.productRepo.getById(orderItem.productId);

      const { price, name, code, packageCode } = product;

      items.push({
        discount: undefined,
        title: name.ru,
        price: price * 100,
        package_code: packageCode,
        count,
        code,
        vat_percent: 12,
      });
    }

    return {
      receipt_type: 0,
      items: items,
    };
  }

  async checkPerformTransaction(params, id) {
    const {
      account: { order_id: orderId },
    } = params;

    let { amount } = params;

    amount = Math.floor(amount / 100);

    const order = await this.orderRepo.getById(orderId);

    if (!order) {
      throw new TransactionError(
        PaymeError.OrderNotFound,
        id,
        PaymeData.OrderId
      );
    }

    if (amount !== order.totalPrice) {
      throw new TransactionError(PaymeError.InvalidAmount, id);
    }

    if (order.orderStatusId === 1) {
      throw new TransactionError(PaymeError.Pending, id);
    }

    if (order.orderStatusId === 3) {
      throw new TransactionError(PaymeError.AlreadyDone, id);
    }

    if (order.orderStatusId === 6) {
      throw new TransactionError(PaymeError.Canceled, id);
    }

    const detail = await checkPerformTransactionDetail(orderId);

    return {
      detail: detail,
      allow: true,
    };
  }

  async checkTransaction(params, id) {
    const transaction = await this.repo.getById(params.id);
    if (!transaction) {
      throw new TransactionError(PaymeError.TransactionNotFound, id);
    }

    return {
      create_time: transaction.create_time,
      perform_time: transaction.perform_time,
      cancel_time: transaction.cancel_time,
      transaction: transaction.id,
      state: transaction.state,
      reason: transaction.reason,
    };
  }

  async createTransaction(params, id) {
    const {
      account: { order_id: orderId },
      time,
    } = params;
    let { amount } = params;

    amount = Math.floor(amount / 100);

    await this.validate(params, id);

    let transaction = await this.repo.getById(params.id);

    if (transaction) {
      if (Number(transaction.state) !== Number(TransactionState.Pending)) {
        throw new TransactionError(PaymeError.CantDoOperation, id);
      }

      const currentTime = Date.now();

      const expirationTime =
        (currentTime - transaction.create_time) / 60000 < 12; // 12m

      if (!expirationTime) {
        await this.repo.update(
          {
            state: TransactionState.PendingCanceled,
            reason: 4,
          },
          { where: { id: params.id } }
        );

        await this.orderRepo.update(
          { orderStatusId: 6 },
          {
            where: {
              id: transaction.orderId,
            },
          }
        );

        throw new TransactionError(PaymeError.CantDoOperation, id);
      }

      return {
        create_time: transaction.create_time,
        transaction: transaction.id,
        state: TransactionState.Pending,
      };
    }

    transaction = await this.repo.getByFilter({
      where: { orderId },
    });

    if (transaction) {
      if (transaction.state === TransactionState.Paid)
        throw new TransactionError(PaymeError.AlreadyDone, id);
      if (transaction.state === TransactionState.Pending)
        throw new TransactionError(PaymeError.Pending, id);
      if (
        transaction.state === TransactionState.PaidCanceled ||
        transaction.state === TransactionState.PendingCanceled
      )
        throw new TransactionError(PaymeError.Canceled, id);
    }

    const newTransaction = await this.repo.create({
      id: params.id,
      state: TransactionState.Pending,
      amount,
      orderId,
      create_time: time,
    });

    await this.orderRepo.update(
      { orderStatusId: 1 },
      {
        where: {
          id: orderId,
        },
      }
    );

    return {
      transaction: newTransaction.id,
      state: TransactionState.Pending,
      create_time: newTransaction.create_time,
    };
  }

  async performTransaction(params, id) {
    const currentTime = Date.now();

    const transaction = await this.repo.getById(params.id);

    if (!transaction) {
      throw new TransactionError(PaymeError.TransactionNotFound, id);
    }

    if (transaction.state !== TransactionState.Pending) {
      if (transaction.state !== TransactionState.Paid) {
        throw new TransactionError(PaymeError.CantDoOperation, id);
      }

      return {
        perform_time: transaction.perform_time,
        transaction: transaction.id,
        state: TransactionState.Paid,
      };
    }

    const expirationTime = (currentTime - transaction.create_time) / 60000 < 12; // 12m

    if (!expirationTime) {
      await this.repo.update(params.id, {
        state: TransactionState.PendingCanceled,
        reason: 4,
        cancel_time: currentTime,
      });

      await this.orderRepo.update(
        { orderStatusId: 6 },
        {
          where: {
            id: transaction.orderId,
          },
        }
      );

      throw new TransactionError(PaymeError.CantDoOperation, id);
    }

    await this.repo.update(
      {
        state: TransactionState.Paid,
        perform_time: currentTime,
      },
      { where: { id: params.id } }
    );

    await this.orderRepo.update(
      { orderStatusId: 3 },
      {
        where: {
          id: transaction.orderId,
        },
      }
    );

    return {
      perform_time: currentTime,
      transaction: transaction.id,
      state: TransactionState.Paid,
    };
  }

  async cancelTransaction(params, id) {
    const transaction = await this.repo.getById(params.id);

    if (!transaction) {
      throw new TransactionError(PaymeError.TransactionNotFound, id);
    }

    const currentTime = Date.now();

    if (transaction.state > 0) {
      await this.repo.update(
        {
          state: -Math.abs(transaction.state),
          reason: params.reason,
          cancel_time: currentTime,
        },
        { where: { id: params.id } }
      );

      await this.orderRepo.update(
        { orderStatusId: 6 },
        {
          where: {
            id: transaction.orderId,
          },
        }
      );
    }

    return {
      cancel_time: transaction.cancel_time || currentTime,
      transaction: transaction.id,
      state: -Math.abs(transaction.state),
    };
  }
}

module.exports = new TransactionService(
  transactionRepo,
  userRepo,
  productRepo,
  orderRepo
);
