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
    totalPrice: { type: DataTypes.BIGINT },
    info: { type: DataTypes.JSON, allowNull: true, defaultValue: {} },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.JSON, allowNull: true },
    comment: { type: DataTypes.STRING },
  },
  {}
);

module.exports = Order;
