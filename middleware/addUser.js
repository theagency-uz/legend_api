const jwt = require("jsonwebtoken");
const config = require("config");

function addUser(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    next();
    return;
  }
  
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = addUser;