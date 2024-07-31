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
    previewImage: { type: DataTypes.STRING, allowNull: false },
    images: { type: DataTypes.JSON, allowNull: true },
    price: { type: DataTypes.BIGINT, allowNull: false },
    packageCode: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    itemsPerBlock: { type: DataTypes.INTEGER, defaultValue: 1 },
    isHidden: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {}
);

module.exports = Product;
