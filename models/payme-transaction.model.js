const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const PaymeTransaction = sequelize.define(
  "payme_transaction",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    state: {
      type: DataTypes.INTEGER,
    },
    amount: { type: DataTypes.BIGINT, allowNull: false },
    create_time: { type: DataTypes.BIGINT, defaultValue: Date.now() },
    perform_time: { type: DataTypes.BIGINT, defaultValue: 0 },
    cancel_time: { type: DataTypes.BIGINT, defaultValue: 0 },
    reason: { type: DataTypes.INTEGER },
  },
  {}
);

module.exports = PaymeTransaction;
