const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    statusId: { type: DataTypes.INTEGER, defaultValue: 1 },
    totalPrice: { type: DataTypes.BIGINT },
    info: { type: DataTypes.JSON, allowNull: true, defaultValue: {} },
  },
  {}
);

module.exports = Order;
