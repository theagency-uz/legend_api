const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
require("express-async-errors");

const app = express();
const sequelize = require("./startup/db");

require("./startup/routes")(app);

const PORT = process.env.PORT || 9000;

const Product = require("./models/product.model");
const ProductCategory = require("./models/product-category.model");
const ProductType = require("./models/product-type.model");
const ProductVariation = require("./models/product-variation");
const User = require("./models/user.model");
const Order = require("./models/order.model");
const OrderStatus = require("./models/order-status.model");
const OrderItem = require("./models/order-item.model");
const PaymentType = require("./models/payment-type");
const Transaction = require("./models/payme-transaction.model");

ProductCategory.hasMany(Product);
Product.belongsTo(ProductCategory);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

ProductVariation.hasMany(Product);
Product.belongsTo(ProductVariation);

User.hasMany(Order);
Order.belongsTo(User);

PaymentType.hasMany(Order);
Order.belongsTo(PaymentType);

OrderStatus.hasMany(Order);
Order.belongsTo(OrderStatus);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasOne(Transaction);
Transaction.belongsTo(Order);

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
