const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db");

const ProductCategory = sequelize.define("product_category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.JSON, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false },
});

module.exports = ProductCategory;
