const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

router.post("/", orderController.createOrder);

module.exports = router;
