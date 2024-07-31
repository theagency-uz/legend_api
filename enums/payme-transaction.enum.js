exports.PaymeMethod = {
  CheckPerformTransaction: "CheckPerformTransaction",
  CheckTransaction: "CheckTransaction",
  CreateTransaction: "CreateTransaction",
  PerformTransaction: "PerformTransaction",
  CancelTransaction: "CancelTransaction",
  GetStatement: "GetStatement",
};

exports.PaymeError = {
  InvalidAmount: {
    name: "InvalidAmount",
    code: -31001,
    message: {
      uz: "Noto'g'ri summa",
      ru: "Недопустимая сумма",
      en: "Invalid amount",
    },
  },
  Canceled: {
    name: "Canceled",
    code: -31050,
    message: {
      uz: "Buyurtma bekor qilindi",
      ru: "Заказ отменен.",
      en: "Order canceled",
    },
  },
  ProductNotFound: {
    name: "ProductNotFound",
    code: -31050,
    message: {
      uz: "Biz mahsulotni topolmadik.",
      ru: "Нам не удалось найти товар.",
      en: "We could not find the product.",
    },
  },
  OrderNotFound: {
    name: "OrderNotFound",
    code: -31050,
    message: {
      uz: "Biz buyurtma topolmadik.",
      ru: "Нам не удалось найти заказ.",
      en: "We could not find the order.",
    },
  },
  CantDoOperation: {
    name: "CantDoOperation",
    code: -31008,
    message: {
      uz: "Biz operatsiyani bajara olmaymiz",
      ru: "Мы не можем сделать операцию",
      en: "We can't do operation",
    },
  },
  TransactionNotFound: {
    name: "TransactionNotFound",
    code: -31003,
    message: {
      uz: "Tranzaktsiya topilmadi",
      ru: "Транзакция не найдена",
      en: "Transaction not found",
    },
  },
  AlreadyDone: {
    name: "AlreadyDone",
    code: -31060,
    message: {
      uz: "Mahsulot uchun to'lov qilingan",
      ru: "Оплачено за товар",
      en: "Paid for the product",
    },
  },
  Pending: {
    name: "Pending",
    code: -31050,
    message: {
      uz: "Mahsulot uchun to'lov kutilayapti",
      ru: "Ожидается оплата за товар",
      en: "Payment for the product is pending",
    },
  },
  InvalidAuthorization: {
    name: "InvalidAuthorization",
    code: -32504,
    message: {
      uz: "Avtorizatsiya yaroqsiz",
      ru: "Авторизация недействительна",
      en: "Authorization invalid",
    },
  },
};

exports.PaymeData = {
  UserId: "user_id",
  ProductId: "product_id",
  OrderId: "order_id",
};

exports.TransactionState = {
  Paid: 2,
  Pending: 1,
  PendingCanceled: -1,
  PaidCanceled: -2,
};
