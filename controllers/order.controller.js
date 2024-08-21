const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");
const OrderStatus = require("../models/order-status.model");
const User = require("../models/user.model");
const PaymentType = require("../models/payment-type");

const { makeCondition } = require("../utils/db");

module.exports.createOrder = async (req, res, next) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const name = req.body.name;
    const phone = req.body.phone;
    const surname = req.body.surname;
    const address = JSON.parse(req.body.address);
    const comment = req.body.comment;

    const totalPrice = req.body.totalPrice;
    const bag = JSON.parse(req.body.bag);

    let orderStatusId = 2;

    const paymentType = await PaymentType.findOne({
      name: req.body.paymentType ?? "",
    });

    const [user] = await User.findOrCreate({
      where: { phone },
      defaults: {
        name,
        phone,
        surname,
        address,
      },
    });

    const order = await Order.create({
      userId: user.id,
      phone,
      paymentTypeId: paymentType.id,
      totalPrice,
      address,
      comment,
      orderStatusId: orderStatusId,
    });

    await OrderItem.bulkCreate([
      ...bag.map((p, index) => {
        return {
          orderId: order.id,
          productId: p.id,
          count: p.count,
          orderNumber: index,
        };
      }),
    ]);

    return res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

module.exports.getOrdersByQuery = async (req, res, next) => {
  try {
    const query = req.query;

    const orderStatusId = query?.status === "all";
    const period = query?.period === "published";

    const filterCondition = {
      ...makeCondition("orderStatusId", orderStatusId),
    };

    const orders = await Order.findAll({ where: { ...filterCondition } });

    res.send(orders);
  } catch (err) {
    next(err);
  }
};

module.exports.getOrderStatuses = async (req, res, next) => {
  try {
    const statuses = await OrderStatus.findAll({});
    res.send(statuses);
  } catch (err) {
    next(err);
  }
};
