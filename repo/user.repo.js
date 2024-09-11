const User = require("../models/user.model");

class UserRepo {
  constructor(model) {
    this.model = model;
  }

  async getById(userId) {
    return this.model.findByPk(userId);
  }
}

module.exports = new UserRepo(User);
