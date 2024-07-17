const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const jwt = require("jsonwebtoken");
const config = require("config");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.JSON, allowNull: true },
    address: { type: DataTypes.JSON, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, unique: true },
    role: {
      type: DataTypes.ENUM(["customer", "admin"]),
      defaultValue: "customer",
    },
  },
  {}
);

User.prototype.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      surname: this.surname,
      phone: this.phone,
      role: this.role,
      address: this.address,
    },
    config.get("jwtPrivateKey")
  );
};

module.exports = User;
