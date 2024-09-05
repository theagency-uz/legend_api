const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

router.get("/statuses", orderController.getOrderStatuses);
router.put("/:id", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);

router.get("/", orderController.getOrdersByQuery);

router.post("/", orderController.createOrder);

module.exports = router;
