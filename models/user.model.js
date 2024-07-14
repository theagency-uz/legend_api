const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.JSON, allowNull: false },
    surname: { type: DataTypes.JSON, allowNull: true },
    address: { type: DataTypes.JSON, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    role: {
      type: DataTypes.ENUM(["customer", "admin"]),
      defaultValue: "customer",
    },
  },
  {}
);

module.exports = User;
