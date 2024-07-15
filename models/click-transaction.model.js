const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const { TransactionStatus } = require("../enums/click-transaction.enum");

const PaymeTransaction = sequelize.define(
  "click_transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(Object.values(TransactionStatus)),
    },
    amount: { type: DataTypes.BIGINT, allowNull: false },
    create_time: { type: DataTypes.BIGINT, defaultValue: Date.now() },
    perform_time: { type: DataTypes.BIGINT, defaultValue: 0 },
    cancel_time: { type: DataTypes.BIGINT, defaultValue: 0 },
    reason: { type: DataTypes.INTEGER },
    prepare_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = PaymeTransaction;
