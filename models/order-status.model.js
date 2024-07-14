const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const OrderStatus = sequelize.define(
  "order_status",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.JSON },
    color: { type: DataTypes.STRING },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {}
);

module.exports = OrderStatus;
