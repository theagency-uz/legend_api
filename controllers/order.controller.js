const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");
const User = require("../models/user.model");
const PaymentType = require("../models/payment-type");

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
