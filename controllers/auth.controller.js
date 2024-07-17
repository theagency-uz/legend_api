const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/user.model");

const { UserRole } = require("../enums/user-role.enum");

module.exports.authAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    let user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(400).send("Неверный email или пароль.");
    }

    if (!user.password) {
      return res.status(500).send("Что-то пошло не так.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).send("Неверный email или пароль.");
    }

    if (user.role === UserRole.CUSTOMER) {
      return res.send(400).send("Неправильные данные.");
    }

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
