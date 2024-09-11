const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");
const OrderStatus = require("../models/order-status.model");
const User = require("../models/user.model");
const PaymentType = require("../models/payment-type");
const Product = require("../models/product.model");

const { makeCondition, makeConditionWithDates } = require("../utils/db");
const {
  getCurrentDate,
  getMonday,
  getFirstDateOfMonth,
} = require("../utils/date");

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
      where: {
        phone,
      },
      defaults: {
        name,
        phone,
        surname,
        address,
      },
    });

    user.name = name;
    user.surname = surname;
    user.address = address;

    await user.save();

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
    let filterCondition = {};

    if (Object.keys(query).length > 0) {
      if (query?.status) {
        filterCondition = {
          ...filterCondition,
          ...makeCondition("orderStatusId", Number(query?.status)),
        };
      }

      if (query?.period) {
        switch (query?.period) {
          case "week":
            filterCondition = {
              ...filterCondition,
              ...makeConditionWithDates(
                "createdAt",
                getMonday(),
                getCurrentDate()
              ),
            };
            break;
          case "month":
            filterCondition = {
              ...filterCondition,
              ...makeConditionWithDates(
                "createdAt",
                getFirstDateOfMonth(),
                getCurrentDate()
              ),
            };
            break;
          case "year":
            filterCondition = {
              ...filterCondition,
              ...makeConditionWithDates(
                "createdAt",
                getFirstDateOfMonth(),
                getCurrentDate()
              ),
            };
            break;
          default:
        }
      }
    }

    const orders = await Order.findAll({
      where: { ...filterCondition },
      include: [
        { model: OrderItem, include: [{ model: Product }] },
        { model: User },
      ],
    });

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

module.exports.updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const orderStatusId = req.body.orderStatusId;

    if (isNaN(orderId) || isNaN(orderStatusId)) return next();

    const result = await Order.update(
      { orderStatusId },
      { where: { id: orderId } }
    );

    res.send(result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    if (isNaN(orderId)) return next();

    const result = await Order.destroy({ where: { id: orderId } });

    res.json({ result });
  } catch (err) {
    next(err);
  }
};
