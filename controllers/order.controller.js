const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");
const User = require("../models/user.model");

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

    const paymentTypeId = req.body.paymentTypeId;
    const totalPrice = req.body.totalPrice;
    const bag = JSON.parse(req.body.bag);

    let orderStatusId = 1;

    const user = await User.create({ name, surname, address, phone });

    const order = await Order.create({
      userId: user.id,
      phone,
      paymentTypeId,
      totalPrice,
      address,
      comment,
      statusId: orderStatusId,
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
