const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const PaymentType = sequelize.define(
  "payment_type",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.JSON },
    isActive: { type: TINYINT, defaultValue: true },
  },
  {}
);

module.exports = PaymentType;
