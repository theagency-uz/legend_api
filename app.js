const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
require("express-async-errors");

const app = express();
const sequelize = require("./startup/db");

require("./startup/routes")(app);

const PORT = process.env.PORT || 9000;

const Product = require("./models/product.model");
const ProductCategory = require("./models/productCategory.model");
const ProductType = require("./models/productType.model");
const ProductVariation = require("./models/productVariation");

ProductCategory.hasMany(Product);
Product.belongsTo(ProductCategory);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

ProductVariation.hasMany(Product);
Product.belongsTo(ProductVariation);

sequelize
  .sync({
    // force: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening to the port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
