const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const ProductVariation = sequelize.define("product_variation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  slug: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = ProductVariation;
