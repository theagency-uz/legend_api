module.exports.makeCondition = function (field, value) {
  const condition =
    value || typeof value === "boolean" || typeof value === "number"
      ? { [field]: value }
      : {};
  return condition;
};
