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
const PaymeTransaction = require("./models/payme-transaction.model");
const ClickTransaction = require("./models/click-transaction.model");

ProductCategory.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(ProductCategory);

ProductType.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(ProductType);

ProductVariation.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(ProductVariation);

User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

PaymentType.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(PaymentType);

OrderStatus.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(OrderStatus);

Order.hasMany(OrderItem, { onDelete: "CASCADE" });
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem, { onDelete: "CASCADE" });
OrderItem.belongsTo(Product);

Order.hasOne(PaymeTransaction, { onDelete: "CASCADE" });
PaymeTransaction.belongsTo(Order);

Order.hasOne(ClickTransaction, { onDelete: "CASCADE" });
ClickTransaction.belongsTo(Order);

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
