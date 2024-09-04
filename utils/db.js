const { Op } = require("sequelize");

module.exports.makeCondition = function (field, value) {
  const condition =
    value || typeof value === "boolean" || typeof value === "number"
      ? { [field]: value }
      : {};
  return condition;
};

module.exports.makeConditionWithDates = function (field, value1, value2) {
  const condition = { [field]: { [Op.between]: [value1, value2] } };
  return condition;
};
