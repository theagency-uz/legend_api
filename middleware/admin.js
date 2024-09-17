module.exports = function (req, res, next) {
    if (req.user?.userRoleId > 2) {
      return res.status(403).send(req.user);
    }

    next();
  };