function getMonday() {
  let d = new Date();
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getCurrentDate() {
  return new Date();
}

function getFirstDateOfMonth() {
  var date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getFirstDateOfYear() {
  var date = new Date();
  return new Date(date.getFullYear(), 0, 1);
}

module.exports = {
  getMonday,
  getCurrentDate,
  getFirstDateOfMonth,
  getFirstDateOfYear,
};
