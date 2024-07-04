const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.JSON, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    images: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
    price: { type: DataTypes.BIGINT, allowNull: false },
    volume: { type: DataTypes.DECIMAL },
    itemsPerBlock: { type: DataTypes.INTEGER, defaultValue: 1 },
    productCategoryId: {
      type: DataTypes.INTEGER,
    },
    isHidden: { type: DataTypes.BOOLEAN, defaultValue: false },
    isGaz: { type: DataTypes.BOOLEAN },
  },
  {}
);

module.exports = Product;
