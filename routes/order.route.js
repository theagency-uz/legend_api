const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/statuses", [auth, admin], orderController.getOrderStatuses);
router.put("/:id", [auth, admin], orderController.updateOrderStatus);
router.delete("/:id", [auth, admin], orderController.deleteOrder);

router.get("/", [auth, admin], orderController.getOrdersByQuery);

router.post("/", [auth, admin], orderController.createOrder);

module.exports = router;
