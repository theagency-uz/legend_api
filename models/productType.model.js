const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const ProductType = sequelize.define("product_type", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.JSON, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false },
});

module.exports = ProductType;
