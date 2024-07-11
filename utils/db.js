module.exports.makeCondition = function (field, value) {
  const condition = value ? { where: { [field]: value } } : {};
  return condition;
};
