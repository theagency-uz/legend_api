const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    count: { type: DataTypes.INTEGER, defaultValue: 1 },
    orderNumber: { type: DataTypes.TINYINT, defaultValue: 0 },
  },
  {}
);

module.exports = OrderItem;
