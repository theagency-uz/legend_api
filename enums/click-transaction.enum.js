exports.ClickError = {
  Success: 0,
  SignFailed: -1,
  InvalidAmount: -2,
  ActionNotFound: -3,
  AlreadyPaid: -4,
  OrderNotFound: -5,
  TransactionNotFound: -6,
  BadRequest: -8,
  TransactionCanceled: -9,
};

exports.ClickAction = {
  Prepare: 0,
  Complete: 1,
};

exports.TransactionStatus = {
  Pending: "PENDING",
  Paid: "PAID",
  Canceled: "CANCELED",
};
