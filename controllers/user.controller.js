const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const User = require("../models/user.model");

const { makeCondition } = require("../utils/db");

module.exports.getUsersByQuery = async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};
